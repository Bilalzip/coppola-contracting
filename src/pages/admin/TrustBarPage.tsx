import { useEffect, useState } from 'react'
import { Plus, Trash2, Loader2, Upload, Image as ImageIcon, ArrowUp, ArrowDown, EyeOff, AlertTriangle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { PressLogo, TrustBarStat } from '../../types/database'
import { TRUST_BAR_ICONS, type TrustBarIconKey } from '../../components/layout/TrustBar'

const ICON_OPTIONS: { key: TrustBarIconKey; label: string }[] = [
  { key: 'star', label: 'Star (rating)' },
  { key: 'home', label: 'Home (projects)' },
  { key: 'award', label: 'Award' },
  { key: 'clock', label: 'Clock (years)' },
  { key: 'check', label: 'Checkmark' },
  { key: 'users', label: 'Users (clients)' },
  { key: 'leaf', label: 'Leaf (made in Canada)' },
  { key: 'location', label: 'Location' },
]

export default function TrustBarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Home — Trust Bar</h1>
        <p className="text-sm text-gray-500 mt-1">
          The credential badges and "As Seen In" press logos shown right below the hero on the home page.
        </p>
        <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>These are public claims shown to every visitor — only enter real, accurate numbers and real press mentions.</span>
        </div>
      </div>

      <StatsSection />
      <PressSection />
    </div>
  )
}

function StatsSection() {
  const [items, setItems] = useState<TrustBarStat[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newIcon, setNewIcon] = useState<TrustBarIconKey>('star')
  const [error, setError] = useState('')

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase.from('trust_bar_stats').select('*').order('sort_order', { ascending: true })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const addStat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLabel.trim()) { setError('Enter a label first'); return }
    setError('')
    const { error } = await supabase.from('trust_bar_stats').insert({
      icon: newIcon,
      label: newLabel.trim(),
      sort_order: items.length,
    })
    if (error) { setError(error.message); return }
    setNewLabel('')
    setAdding(false)
    fetchItems()
  }

  const updateLabel = async (item: TrustBarStat, label: string) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, label } : i)))
    await supabase.from('trust_bar_stats').update({ label }).eq('id', item.id)
  }

  const updateIcon = async (item: TrustBarStat, icon: TrustBarIconKey) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, icon } : i)))
    await supabase.from('trust_bar_stats').update({ icon }).eq('id', item.id)
  }

  const toggleActive = async (item: TrustBarStat) => {
    await supabase.from('trust_bar_stats').update({ active: !item.active }).eq('id', item.id)
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, active: !i.active } : i)))
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this stat?')) return
    await supabase.from('trust_bar_stats').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    setItems(reordered)
    await Promise.all(reordered.map((item, i) => supabase.from('trust_bar_stats').update({ sort_order: i }).eq('id', item.id)))
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Stat Badges</h2>
        <button
          onClick={() => setAdding((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add stat
        </button>
      </div>

      {adding && (
        <form onSubmit={addStat} className="flex items-end gap-2 p-3 bg-gray-50 rounded-xl">
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex-shrink-0">
            <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
            <select
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value as TrustBarIconKey)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              {ICON_OPTIONS.map((opt) => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder='e.g. "4.8 STARS (GOOGLE)"'
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-[#001f54] text-white rounded-lg text-sm font-medium hover:bg-[#002a6e]">
            Add
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-gray-400" /></div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-400 py-4">No stat badges yet.</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((item, index) => {
            const Icon = TRUST_BAR_ICONS[item.icon as TrustBarIconKey] ?? TRUST_BAR_ICONS.star
            return (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button onClick={() => move(index, -1)} disabled={index === 0} className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-25">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-25">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <select
                  value={item.icon}
                  onChange={(e) => updateIcon(item, e.target.value as TrustBarIconKey)}
                  className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white flex-shrink-0"
                >
                  {ICON_OPTIONS.map((opt) => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
                </select>
                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  value={item.label}
                  onChange={(e) => updateLabel(item, e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                />
                {!item.active && <EyeOff className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />}
                <button onClick={() => toggleActive(item)} className="px-2.5 py-1 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex-shrink-0">
                  {item.active ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => remove(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function PressSection() {
  const [items, setItems] = useState<PressLogo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase.from('press_logos').select('*').order('sort_order', { ascending: true })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('gallery-images').upload(path, file)
    if (error) {
      setError(error.message)
      setUploading(false)
      return
    }
    const { data } = supabase.storage.from('gallery-images').getPublicUrl(path)
    const name = file.name.replace(/\.[^.]+$/, '')
    const { error: insertError } = await supabase.from('press_logos').insert({
      name,
      logo_url: data.publicUrl,
      sort_order: items.length,
    })
    setUploading(false)
    e.target.value = ''
    if (insertError) setError(insertError.message)
    else fetchItems()
  }

  const updateField = async (item: PressLogo, field: 'name' | 'link_url', value: string) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, [field]: value } : i)))
    await supabase.from('press_logos').update({ [field]: value || null }).eq('id', item.id)
  }

  const toggleActive = async (item: PressLogo) => {
    await supabase.from('press_logos').update({ active: !item.active }).eq('id', item.id)
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, active: !i.active } : i)))
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this press logo?')) return
    await supabase.from('press_logos').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    setItems(reordered)
    await Promise.all(reordered.map((item, i) => supabase.from('press_logos').update({ sort_order: i }).eq('id', item.id)))
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">"As Seen In" Press Logos</h2>
        <label className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Uploading...' : 'Upload logo'}
        </label>
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-gray-400" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-6">
          <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No press logos yet. Only add real publications that have actually featured Coppola Home.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-3 py-3">
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <button onClick={() => move(index, -1)} disabled={index === 0} className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-25">
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-25">
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="w-16 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={item.logo_url} alt={item.name} className="max-w-full max-h-full object-contain" />
              </div>
              <input
                value={item.name}
                onChange={(e) => updateField(item, 'name', e.target.value)}
                placeholder="Publication name"
                className="w-40 px-3 py-1.5 border border-gray-200 rounded-lg text-sm flex-shrink-0"
              />
              <input
                value={item.link_url ?? ''}
                onChange={(e) => updateField(item, 'link_url', e.target.value)}
                placeholder="Link to the feature (optional)"
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
              />
              {!item.active && <EyeOff className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />}
              <button onClick={() => toggleActive(item)} className="px-2.5 py-1 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex-shrink-0">
                {item.active ? 'Hide' : 'Show'}
              </button>
              <button onClick={() => remove(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
