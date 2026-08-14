import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Quote, X, Loader2, Star } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Testimonial } from '../../types/database'

interface TestimonialForm {
  name: string
  quote: string
  rating: number
  featured: boolean
}

const defaultForm: TestimonialForm = { name: '', quote: '', rating: 5, featured: false }

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)
  const [form, setForm] = useState<TestimonialForm>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const openAdd = () => { setEditingItem(null); setForm(defaultForm); setError(''); setModalOpen(true) }

  const openEdit = (item: Testimonial) => {
    setEditingItem(item)
    setForm({ name: item.name, quote: item.quote, rating: item.rating, featured: item.featured })
    setError('')
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.quote) { setError('Name and quote are required'); return }
    setSaving(true)
    setError('')
    const payload = { name: form.name, quote: form.quote, rating: form.rating, featured: form.featured }
    const { error } = editingItem
      ? await supabase.from('testimonials').update(payload).eq('id', editingItem.id)
      : await supabase.from('testimonials').insert(payload)
    if (error) { setError(error.message); setSaving(false) }
    else { setModalOpen(false); fetchItems() }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return
    await supabase.from('testimonials').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} items</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#001f54] text-white rounded-xl text-sm font-medium hover:bg-[#002a6e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Quote className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No testimonials yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {item.featured && (
                    <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-medium">Featured</span>
                  )}
                  <button onClick={() => openEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.name)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-4">{item.quote}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Customer Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Jenny Wilson"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quote *</label>
                <textarea
                  required
                  rows={4}
                  value={form.quote}
                  onChange={e => setForm(prev => ({ ...prev, quote: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="What the customer said..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating</label>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, rating: i + 1 }))}
                      className="p-0.5"
                    >
                      <Star className={`w-6 h-6 ${i < form.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}
                  className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${form.featured ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">Featured (shown on home page)</span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#001f54] text-white rounded-xl text-sm font-medium hover:bg-[#002a6e] transition-colors disabled:opacity-60"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingItem ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
