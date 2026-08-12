import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Image as ImageIcon, X, Loader2, Upload } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { GalleryItem } from '../../types/database'

interface GalleryForm {
  title: string
  description: string
  category: string
  featured: boolean
  images: string[]
}

const defaultForm: GalleryForm = { title: '', description: '', category: '', featured: false, images: [] }

const GALLERY_CATEGORIES = ['Kitchen', 'Bathroom', 'Living Room', 'Outdoor', 'Commercial', 'Custom Cabinetry', 'Other']

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState<GalleryForm>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const openAdd = () => { setEditingItem(null); setForm(defaultForm); setError(''); setModalOpen(true) }

  const openEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setForm({ title: item.title, description: item.description ?? '', category: item.category ?? '', featured: item.featured, images: item.images })
    setError('')
    setModalOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    const urls: string[] = []
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('gallery-images').upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from('gallery-images').getPublicUrl(path)
        urls.push(data.publicUrl)
      }
    }
    setForm(prev => ({ ...prev, images: [...prev.images, ...urls] }))
    setUploading(false)
    e.target.value = ''
  }

  const removeImage = async (url: string) => {
    const path = url.split('/gallery-images/')[1]
    if (path) await supabase.storage.from('gallery-images').remove([path])
    setForm(prev => ({ ...prev, images: prev.images.filter(u => u !== url) }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) { setError('Title is required'); return }
    setSaving(true)
    setError('')
    const payload = {
      title: form.title,
      description: form.description || null,
      category: form.category || null,
      featured: form.featured,
      images: form.images
    }
    const { error } = editingItem
      ? await supabase.from('gallery').update(payload).eq('id', editingItem.id)
      : await supabase.from('gallery').insert(payload)
    if (error) { setError(error.message); setSaving(false) }
    else { setModalOpen(false); fetchItems() }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    await supabase.from('gallery').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} items</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#001f54] text-white rounded-xl text-sm font-medium hover:bg-[#002a6e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No gallery items yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {item.images[0] ? (
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-300" />
                  </div>
                )}
                {item.featured && (
                  <span className="absolute top-2 left-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-medium">Featured</span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                    {item.category && <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>}
                    {item.images.length > 1 && <p className="text-xs text-gray-400 mt-0.5">{item.images.length} images</p>}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => openEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.title)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Modern Kitchen Renovation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select category</option>
                  {GALLERY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Brief description of the project..."
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}
                  className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${form.featured ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>

              {/* Image upload */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Images</label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {uploading ? <Loader2 className="w-6 h-6 text-blue-500 animate-spin" /> : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mb-1" />
                      <p className="text-sm text-gray-500">Click to upload</p>
                    </>
                  )}
                </label>

                {form.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {form.images.map((url, i) => (
                      <div key={i} className="relative group aspect-square">
                        <img src={url} alt="" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                        <button
                          type="button"
                          onClick={() => removeImage(url)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#001f54] text-white rounded-xl text-sm font-medium hover:bg-[#002a6e] transition-colors disabled:opacity-60"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
