import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload, X, Plus, Loader2 } from 'lucide-react'
import { supabase } from '../../../lib/supabase'

const CATEGORIES = ['vanity','quartz','faucet','mirror','sink','toilet','flooring','lighting','hardware'] as const
type Category = typeof CATEGORIES[number]

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// Category-specific filter fields
const CATEGORY_FILTERS: Record<string, { key: string; label: string; type: 'text' | 'select' | 'checkbox'; options?: string[] }[]> = {
  vanity: [
    { key: 'size', label: 'Size', type: 'text' },
    { key: 'finish', label: 'Finish', type: 'text' },
    { key: 'material', label: 'Material', type: 'text' },
    { key: 'color', label: 'Color', type: 'text' },
    { key: 'mounting_type', label: 'Mounting Type', type: 'select', options: ['Freestanding', 'Wall-mounted', 'Floor-mounted'] },
    { key: 'sink_count', label: 'Sink Count', type: 'select', options: ['1', '2'] },
    { key: 'has_soft_close', label: 'Soft Close', type: 'checkbox' },
  ],
  quartz: [
    { key: 'collection', label: 'Collection', type: 'text' },
    { key: 'thickness', label: 'Thickness', type: 'select', options: ['2cm', '3cm'] },
    { key: 'finish', label: 'Finish', type: 'select', options: ['Polished', 'Honed', 'Leathered'] },
    { key: 'slab_size', label: 'Slab Size', type: 'text' },
  ],
  faucet: [
    { key: 'faucet_category', label: 'Faucet Category', type: 'select', options: ['Kitchen', 'Bathroom', 'Shower'] },
    { key: 'finish', label: 'Finish', type: 'text' },
    { key: 'handle_type', label: 'Handle Type', type: 'select', options: ['Single', 'Double'] },
    { key: 'mounting_type', label: 'Mounting Type', type: 'select', options: ['Deck-mount', 'Wall-mount'] },
    { key: 'spout_height', label: 'Spout Height', type: 'text' },
    { key: 'flow_rate', label: 'Flow Rate', type: 'text' },
  ],
  mirror: [
    { key: 'shape', label: 'Shape', type: 'select', options: ['Round', 'Rectangular', 'Oval', 'Arch', 'Square'] },
    { key: 'width_inches', label: 'Width (inches)', type: 'text' },
    { key: 'height_inches', label: 'Height (inches)', type: 'text' },
    { key: 'frame_finish', label: 'Frame Finish', type: 'text' },
    { key: 'has_led', label: 'LED Lighting', type: 'checkbox' },
    { key: 'has_anti_fog', label: 'Anti-Fog', type: 'checkbox' },
  ],
  sink: [
    { key: 'sink_type', label: 'Sink Type', type: 'select', options: ['Kitchen', 'Bathroom', 'Vessel', 'Undermount', 'Drop-in'] },
    { key: 'material', label: 'Material', type: 'select', options: ['Stainless Steel', 'Ceramic', 'Granite', 'Composite', 'Porcelain'] },
    { key: 'mounting_type', label: 'Mounting Type', type: 'select', options: ['Undermount', 'Drop-in', 'Vessel', 'Wall-mount'] },
    { key: 'bowl_count', label: 'Bowl Count', type: 'select', options: ['1', '2', '3'] },
    { key: 'color', label: 'Color', type: 'text' },
    { key: 'drain_size', label: 'Drain Size', type: 'text' },
  ],
  toilet: [
    { key: 'toilet_type', label: 'Toilet Type', type: 'select', options: ['One-piece', 'Two-piece', 'Wall-mounted', 'Smart'] },
    { key: 'flush_type', label: 'Flush Type', type: 'select', options: ['Dual-flush', 'Single-flush', 'Touchless'] },
    { key: 'bowl_height', label: 'Bowl Height', type: 'select', options: ['Standard', 'Comfort', 'ADA'] },
    { key: 'water_usage', label: 'Water Usage (GPF)', type: 'text' },
    { key: 'seat_included', label: 'Seat Included', type: 'checkbox' },
  ],
  flooring: [
    { key: 'flooring_type', label: 'Flooring Type', type: 'select', options: ['Vinyl', 'Laminate', 'Hardwood', 'Tile', 'Carpet'] },
    { key: 'color_tone', label: 'Color Tone', type: 'select', options: ['Light', 'Medium', 'Dark'] },
    { key: 'plank_size', label: 'Plank Size', type: 'text' },
    { key: 'thickness', label: 'Thickness', type: 'text' },
    { key: 'finish', label: 'Finish', type: 'text' },
    { key: 'waterproof', label: 'Waterproof', type: 'checkbox' },
  ],
  lighting: [],
  hardware: [],
}

interface FormState {
  name: string
  slug: string
  category: Category
  brand: string
  description: string
  short_description: string
  price: string
  stock_quantity: string
  in_stock: boolean
  is_catalogue: boolean
  featured: boolean
  filters: Record<string, string>
  specs: { label: string; value: string }[]
  tags: string[]
  images: string[]
}

const defaultForm: FormState = {
  name: '', slug: '', category: 'vanity', brand: '',
  description: '', short_description: '', price: '',
  stock_quantity: '', in_stock: true, is_catalogue: true,
  featured: false, filters: {}, specs: [], tags: [], images: []
}

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState<FormState>(defaultForm)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  // Spec + tag input state
  const [newSpecLabel, setNewSpecLabel] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (!isEdit) return
    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        setForm({
          name: data.name,
          slug: data.slug,
          category: data.category,
          brand: data.brand ?? '',
          description: data.description ?? '',
          short_description: data.short_description ?? '',
          price: data.price?.toString() ?? '',
          stock_quantity: data.stock_quantity?.toString() ?? '',
          in_stock: data.in_stock,
          is_catalogue: data.is_catalogue,
          featured: data.featured,
          filters: data.filters ?? {},
          specs: data.specs ?? [],
          tags: data.tags ?? [],
          images: data.images ?? [],
        })
      }
      setLoading(false)
    })
  }, [id, isEdit])

  const set = (field: keyof FormState, value: FormState[keyof FormState]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleNameChange = (value: string) => {
    setForm(prev => ({ ...prev, name: value, slug: generateSlug(value) }))
  }

  const handleFilterChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, filters: { ...prev.filters, [key]: value } }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    const urls: string[] = []
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('product-images').upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from('product-images').getPublicUrl(path)
        urls.push(data.publicUrl)
      }
    }
    setForm(prev => ({ ...prev, images: [...prev.images, ...urls] }))
    setUploading(false)
    e.target.value = ''
  }

  const removeImage = async (url: string) => {
    const path = url.split('/product-images/')[1]
    if (path) await supabase.storage.from('product-images').remove([path])
    setForm(prev => ({ ...prev, images: prev.images.filter(u => u !== url) }))
  }

  const addSpec = () => {
    if (!newSpecLabel || !newSpecValue) return
    setForm(prev => ({ ...prev, specs: [...prev.specs, { label: newSpecLabel, value: newSpecValue }] }))
    setNewSpecLabel('')
    setNewSpecValue('')
  }

  const removeSpec = (i: number) =>
    setForm(prev => ({ ...prev, specs: prev.specs.filter((_, idx) => idx !== i) }))

  const addTag = () => {
    if (!newTag.trim()) return
    setForm(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
    setNewTag('')
  }

  const removeTag = (i: number) =>
    setForm(prev => ({ ...prev, tags: prev.tags.filter((_, idx) => idx !== i) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      name: form.name,
      slug: form.slug || generateSlug(form.name),
      category: form.category,
      brand: form.brand || null,
      description: form.description || null,
      short_description: form.short_description || null,
      price: form.price ? parseFloat(form.price) : null,
      stock_quantity: form.stock_quantity ? parseInt(form.stock_quantity) : null,
      in_stock: form.in_stock,
      is_catalogue: form.is_catalogue,
      featured: form.featured,
      filters: form.filters,
      specs: form.specs,
      tags: form.tags,
      images: form.images,
    }

    const { error } = isEdit
      ? await supabase.from('products').update(payload).eq('id', id)
      : await supabase.from('products').insert(payload)

    if (error) {
      setError(error.message)
      setSaving(false)
    } else {
      navigate('/admin/products')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  const categoryFilters = CATEGORY_FILTERS[form.category] ?? []

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/products" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
          <p className="text-sm text-gray-500">{isEdit ? 'Update product details' : 'Fill in the details for the new product'}</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="text-base font-semibold text-gray-900">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
            <input
              required
              value={form.name}
              onChange={e => handleNameChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Boston 30 Bathroom Vanity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
            <input
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="auto-generated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
            <select
              required
              value={form.category}
              onChange={e => {
                const cat = e.target.value as Category
                setForm(prev => ({ ...prev, category: cat, filters: {} }))
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white capitalize"
            >
              {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
            <input
              value={form.brand}
              onChange={e => set('brand', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Coppola Home"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={e => set('price', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity</label>
            <input
              type="number"
              min="0"
              value={form.stock_quantity}
              onChange={e => set('stock_quantity', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description</label>
            <input
              value={form.short_description}
              onChange={e => set('short_description', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="One-line summary shown in listings"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              rows={5}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Full product description..."
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-6 pt-2">
          {([
            ['in_stock', 'In Stock'],
            ['is_catalogue', 'Catalogue Product'],
            ['featured', 'Featured on Homepage'],
          ] as [keyof FormState, string][]).map(([field, label]) => (
            <label key={field as string} className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => set(field, !form[field])}
                className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${form[field] ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form[field] ? 'translate-x-4' : ''}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      {categoryFilters.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-900 capitalize">{form.category} Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryFilters.map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                {f.type === 'checkbox' ? (
                  <label className="flex items-center gap-2.5 cursor-pointer mt-2">
                    <div
                      onClick={() => handleFilterChange(f.key, form.filters[f.key] === 'true' ? 'false' : 'true')}
                      className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${form.filters[f.key] === 'true' ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.filters[f.key] === 'true' ? 'translate-x-4' : ''}`} />
                    </div>
                    <span className="text-sm text-gray-600">Yes</span>
                  </label>
                ) : f.type === 'select' ? (
                  <select
                    value={form.filters[f.key] ?? ''}
                    onChange={e => handleFilterChange(f.key, e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select...</option>
                    {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={form.filters[f.key] ?? ''}
                    onChange={e => handleFilterChange(f.key, e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Images */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Images</h2>

        {/* Upload area */}
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          {uploading ? (
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">Click to upload images</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
            </>
          )}
        </label>

        {/* Image previews */}
        {form.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {form.images.map((url, i) => (
              <div key={i} className="relative group aspect-square">
                <img src={url} alt="" className="w-full h-full object-cover rounded-xl border border-gray-200" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-xs bg-black/60 text-white px-1.5 py-0.5 rounded">Main</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Specifications</h2>
        <div className="space-y-2">
          {form.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700 w-1/3">{spec.label}</span>
              <span className="text-sm text-gray-600 flex-1">{spec.value}</span>
              <button type="button" onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newSpecLabel}
            onChange={e => setNewSpecLabel(e.target.value)}
            placeholder="Label (e.g. Dimensions)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={newSpecValue}
            onChange={e => setNewSpecValue(e.target.value)}
            placeholder='Value (e.g. 30" x 22")'
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addSpec}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {form.tags.map((tag, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {tag}
              <button type="button" onClick={() => removeTag(i)} className="hover:text-blue-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add a tag and press Enter"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <Link
          to="/admin/products"
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#001f54] text-white rounded-xl text-sm font-medium hover:bg-[#002a6e] transition-colors disabled:opacity-60"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {isEdit ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}
