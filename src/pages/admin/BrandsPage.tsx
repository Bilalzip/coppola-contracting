import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Image as ImageIcon, X, Loader2, Upload, ArrowUp, ArrowDown, EyeOff } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Brand } from '../../types/database'

interface BrandForm {
  name: string
  logo_url: string
  active: boolean
}

const defaultForm: BrandForm = { name: '', logo_url: '', active: true }

export default function BrandsPage() {
  const [items, setItems] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Brand | null>(null)
  const [form, setForm] = useState<BrandForm>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase.from('brands').select('*').order('sort_order', { ascending: true })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const openAdd = () => {
    setEditingItem(null)
    setForm(defaultForm)
    setError('')
    setModalOpen(true)
  }

  const openEdit = (item: Brand) => {
    setEditingItem(item)
    setForm({ name: item.name, logo_url: item.logo_url, active: item.active })
    setError('')
    setModalOpen(true)
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('gallery-images').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('gallery-images').getPublicUrl(path)
      setForm((prev) => ({ ...prev, logo_url: data.publicUrl }))
    }
    setUploading(false)
    e.target.value = ''
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) { setError('Name is required'); return }
    if (!form.logo_url) { setError('Logo is required'); return }
    setSaving(true)
    setError('')
    const payload = { name: form.name, logo_url: form.logo_url, active: form.active }
    const { error } = editingItem
      ? await supabase.from('brands').update(payload).eq('id', editingItem.id)
      : await supabase.from('brands').insert({ ...payload, sort_order: items.length })
    if (error) { setError(error.message); setSaving(false) }
    else { setModalOpen(false); setSaving(false); fetchItems() }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"?`)) return
    await supabase.from('brands').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const toggleActive = async (item: Brand) => {
    await supabase.from('brands').update({ active: !item.active }).eq('id', item.id)
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, active: !i.active } : i)))
  }

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    setItems(reordered)
    await Promise.all(
      reordered.map((item, i) => supabase.from('brands').update({ sort_order: i }).eq('id', item.id))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partnered Brands</h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} logos — shown in the marquee on the home page. Use the arrows to reorder.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#001f54] text-white rounded-xl text-sm font-medium hover:bg-[#002a6e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No brand logos yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 p-4">
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="w-20 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={item.logo_url} alt={item.name} className="max-w-full max-h-full object-contain" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                {!item.active && (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <EyeOff className="w-3 h-3" />
                    Hidden
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleActive(item)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {item.active ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => openEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(item.id, item.name)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editingItem ? 'Edit Brand' : 'Add Brand'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Marathon Hardware"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Logo *</label>
                <div className="flex items-start gap-4">
                  <div className="w-24 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {form.logo_url ? (
                      <img src={form.logo_url} alt="" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? 'Uploading...' : 'Upload logo'}
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Transparent PNG or SVG works best.</p>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setForm((prev) => ({ ...prev, active: !prev.active }))}
                  className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${form.active ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.active ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">Visible on site</span>
              </label>

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
                  {editingItem ? 'Save Changes' : 'Add Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
