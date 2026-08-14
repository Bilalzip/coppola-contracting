import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader2, Save, Plus, Trash2, Image as ImageIcon, Upload, Video as VideoIcon } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { PageSection } from '../../types/database'

const PAGE_LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About Us',
  'custom-cabinetry': 'Custom Cabinetry',
  'our-expertise': 'Our Expertise',
  'our-works': 'Our Works',
  contact: 'Contact',
  'get-quote': 'Get a Quote',
  products: 'Products',
}

type ItemField = 'text' | 'card'

// Sections whose `items` are simple strings (bullet points / tags) vs. cards
// (title+description). Anything not listed here has no items list at all.
const TEXT_ITEM_SECTIONS = new Set(['section_1', 'section_2', 'section_3', 'section_4'])
const CARD_ITEM_SECTIONS = new Set(['values', 'why_choose'])

function itemFieldFor(sectionKey: string): ItemField | null {
  if (TEXT_ITEM_SECTIONS.has(sectionKey)) return 'text'
  if (CARD_ITEM_SECTIONS.has(sectionKey)) return 'card'
  return null
}

export default function AppearancePage() {
  const { pageKey = '' } = useParams()
  const [sections, setSections] = useState<PageSection[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    supabase
      .from('page_sections')
      .select('*')
      .eq('page_key', pageKey)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setSections(data ?? [])
        setActiveTab(data && data.length > 0 ? data[0].section_key : null)
        setLoading(false)
      })
  }, [pageKey])

  const active = sections.find((s) => s.section_key === activeTab) ?? null

  const updateActive = (patch: Partial<PageSection>) => {
    if (!active) return
    setSections((prev) => prev.map((s) => (s.id === active.id ? { ...s, ...patch } : s)))
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (sections.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-sm">
          No editable sections found for this page yet. Run <code className="bg-gray-100 px-1.5 py-0.5 rounded">supabase/add_page_sections.sql</code> in the Supabase SQL Editor to seed them.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-gray-400 mb-1">
          <Link to="/admin/dashboard" className="hover:text-gray-600">Admin</Link> / Appearance
        </p>
        <h1 className="text-2xl font-bold text-gray-900">{PAGE_LABELS[pageKey] ?? pageKey}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit the text, images, and cards on this page — changes appear on the live site as soon as you save.
        </p>
      </div>

      {/* Tabs, in the order sections appear on the real page */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-px">
        {sections.map((s) => (
          <button
            key={s.section_key}
            onClick={() => setActiveTab(s.section_key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors ${
              activeTab === s.section_key
                ? 'border-[#001f54] text-[#001f54] bg-blue-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {active && <SectionForm key={active.id} pageKey={pageKey} section={active} onChange={updateActive} />}
    </div>
  )
}

function SectionForm({
  pageKey,
  section,
  onChange,
}: {
  pageKey: string
  section: PageSection
  onChange: (patch: Partial<PageSection>) => void
}) {
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const itemField = itemFieldFor(section.section_key)
  const hasImage = section.image_url !== null
  const hasSubheading = section.subheading !== null || section.section_key === 'hero' || section.section_key === 'story' || section.section_key === 'values' || section.section_key === 'why_choose'
  // Only the Home hero has a background video.
  const isHomeHero = pageKey === 'home' && section.section_key === 'hero'
  // Color pickers apply to any section that has text to color.
  const hasColorControls = section.heading !== null || section.subheading !== null || section.body !== null

  const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `page-sections/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('gallery-images').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('gallery-images').getPublicUrl(path)
      onChange({ image_url: data.publicUrl })
    }
    setUploading(false)
    e.target.value = ''
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingVideo(true)
    setError('')
    const ext = file.name.split('.').pop()
    const path = `hero/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('videos').upload(path, file)
    if (error) {
      setError(error.message)
    } else {
      const { data } = supabase.storage.from('videos').getPublicUrl(path)
      onChange({ video_url: data.publicUrl })
    }
    setUploadingVideo(false)
    e.target.value = ''
  }

  const updateTextItem = (index: number, value: string) => {
    const items = [...(section.items as string[])]
    items[index] = value
    onChange({ items })
  }
  const addTextItem = () => onChange({ items: [...(section.items as string[]), ''] })
  const removeTextItem = (index: number) =>
    onChange({ items: (section.items as string[]).filter((_, i) => i !== index) })

  const updateCardItem = (index: number, field: 'title' | 'description', value: string) => {
    const items = [...(section.items as { title: string; description: string }[])]
    items[index] = { ...items[index], [field]: value }
    onChange({ items })
  }
  const addCardItem = () =>
    onChange({ items: [...(section.items as { title: string; description: string }[]), { title: '', description: '' }] })
  const removeCardItem = (index: number) =>
    onChange({ items: (section.items as { title: string; description: string }[]).filter((_, i) => i !== index) })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)
    const { error } = await supabase
      .from('page_sections')
      .update({
        heading: section.heading,
        subheading: section.subheading,
        body: section.body,
        image_url: section.image_url,
        video_url: section.video_url,
        heading_color: section.heading_color,
        subheading_color: section.subheading_color,
        body_color: section.body_color,
        items: section.items,
      })
      .eq('id', section.id)
    setSaving(false)
    if (error) {
      setError(error.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5 max-w-3xl">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

      {section.heading !== null && (
        <div>
          <label className={labelClass}>Heading</label>
          <input
            value={section.heading ?? ''}
            onChange={(e) => onChange({ heading: e.target.value })}
            className={inputClass}
          />
        </div>
      )}

      {hasSubheading && (
        <div>
          <label className={labelClass}>Subheading / label</label>
          <input
            value={section.subheading ?? ''}
            onChange={(e) => onChange({ subheading: e.target.value })}
            className={inputClass}
          />
        </div>
      )}

      {section.body !== null && (
        <div>
          <label className={labelClass}>Body text</label>
          <textarea
            rows={5}
            value={section.body ?? ''}
            onChange={(e) => onChange({ body: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      {hasImage && (
        <div>
          <label className={labelClass}>Image</label>
          <div className="flex items-start gap-4">
            <div className="w-32 h-24 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
              {section.image_url ? (
                <img src={section.image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gray-300" />
                </div>
              )}
            </div>
            <label className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? 'Uploading...' : 'Replace image'}
            </label>
          </div>
        </div>
      )}

      {isHomeHero && (
        <div>
          <label className={labelClass}>Background video</label>
          <div className="flex items-start gap-4">
            <div className="w-40 h-24 rounded-xl bg-gray-900 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
              {section.video_url ? (
                <video src={section.video_url} className="w-full h-full object-cover" muted />
              ) : (
                <VideoIcon className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                {uploadingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploadingVideo ? 'Uploading...' : 'Replace video'}
              </label>
              <p className="text-xs text-gray-400 mt-1.5">Plays muted and on loop behind the hero text.</p>
            </div>
          </div>
        </div>
      )}

      {hasColorControls && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {section.heading !== null && (
            <div>
              <label className={labelClass}>Heading color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={/^#[0-9a-fA-F]{6}$/.test(section.heading_color ?? '') ? section.heading_color! : '#000000'}
                  onChange={(e) => onChange({ heading_color: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer flex-shrink-0"
                />
                <input
                  value={section.heading_color ?? ''}
                  onChange={(e) => onChange({ heading_color: e.target.value })}
                  className={inputClass}
                  placeholder="#111827"
                />
              </div>
            </div>
          )}
          {hasSubheading && (
            <div>
              <label className={labelClass}>Subheading color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={/^#[0-9a-fA-F]{6}$/.test(section.subheading_color ?? '') ? section.subheading_color! : '#000000'}
                  onChange={(e) => onChange({ subheading_color: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer flex-shrink-0"
                />
                <input
                  value={section.subheading_color ?? ''}
                  onChange={(e) => onChange({ subheading_color: e.target.value })}
                  className={inputClass}
                  placeholder="rgba(0,0,0,0.7)"
                />
              </div>
            </div>
          )}
          {section.body !== null && (
            <div>
              <label className={labelClass}>Description color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={/^#[0-9a-fA-F]{6}$/.test(section.body_color ?? '') ? section.body_color! : '#000000'}
                  onChange={(e) => onChange({ body_color: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer flex-shrink-0"
                />
                <input
                  value={section.body_color ?? ''}
                  onChange={(e) => onChange({ body_color: e.target.value })}
                  className={inputClass}
                  placeholder="rgba(0,0,0,0.6)"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {itemField === 'text' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Bullet points</label>
            <button type="button" onClick={addTextItem} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {(section.items as string[]).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={item} onChange={(e) => updateTextItem(i, e.target.value)} className={`${inputClass} flex-1`} />
              <button type="button" onClick={() => removeTextItem(i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {itemField === 'card' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Cards</label>
            <button type="button" onClick={addCardItem} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <Plus className="w-4 h-4" />
              Add card
            </button>
          </div>
          {(section.items as { title: string; description: string }[]).map((item, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  value={item.title}
                  onChange={(e) => updateCardItem(i, 'title', e.target.value)}
                  placeholder="Title"
                  className={`${inputClass} flex-1 font-medium`}
                />
                <button type="button" onClick={() => removeCardItem(i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => updateCardItem(i, 'description', e.target.value)}
                placeholder="Description"
                className={`${inputClass} resize-none`}
              />
            </div>
          ))}
        </div>
      )}

      {itemField === null && (section.items as unknown[])?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Tags</label>
            <button
              type="button"
              onClick={() => onChange({ items: [...(section.items as string[]), ''] })}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {(section.items as string[]).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={item} onChange={(e) => updateTextItem(i, e.target.value)} className={`${inputClass} flex-1`} />
              <button type="button" onClick={() => removeTextItem(i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#001f54] text-white rounded-xl text-sm font-medium hover:bg-[#002a6e] transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
        {saved && <span className="text-sm text-green-600 font-medium">Saved</span>}
      </div>
    </form>
  )
}
