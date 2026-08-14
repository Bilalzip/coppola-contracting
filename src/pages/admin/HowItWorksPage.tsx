import { useEffect, useState } from 'react'
import { Plus, Trash2, Loader2, ArrowUp, ArrowDown, EyeOff, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { HowItWorksStep, PageSection } from '../../types/database'

interface CtaItem {
  label: string
  link: string
}

export default function HowItWorksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Home — How It Works</h1>
        <p className="text-sm text-gray-500 mt-1">
          The process timeline shown on the home page, plus its intro text and two call-to-action buttons.
        </p>
      </div>

      <IntroSection />
      <StepsSection />
    </div>
  )
}

function IntroSection() {
  const [section, setSection] = useState<PageSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase
      .from('page_sections')
      .select('*')
      .eq('page_key', 'home')
      .eq('section_key', 'how_it_works')
      .single()
      .then(({ data }) => {
        setSection(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!section) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
        Intro text row not found. Run <code className="bg-gray-100 px-1.5 py-0.5 rounded">supabase/add_how_it_works.sql</code> in the Supabase SQL Editor.
      </div>
    )
  }

  const ctas = (section.items as CtaItem[]) ?? []

  const updateCta = (index: number, field: keyof CtaItem, value: string) => {
    const next = [...ctas]
    next[index] = { ...next[index], [field]: value }
    setSection({ ...section, items: next })
  }

  const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    await supabase
      .from('page_sections')
      .update({
        heading: section.heading,
        subheading: section.subheading,
        body: section.body,
        items: section.items,
      })
      .eq('id', section.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Intro Text</h2>

      <div>
        <label className={labelClass}>Eyebrow label</label>
        <input
          value={section.subheading ?? ''}
          onChange={(e) => setSection({ ...section, subheading: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Heading</label>
        <input
          value={section.heading ?? ''}
          onChange={(e) => setSection({ ...section, heading: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Subheading text</label>
        <textarea
          rows={2}
          value={section.body ?? ''}
          onChange={(e) => setSection({ ...section, body: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="space-y-3">
        <label className={labelClass}>Buttons (first is filled, second is outlined)</label>
        {ctas.map((cta, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={cta.label}
              onChange={(e) => updateCta(i, 'label', e.target.value)}
              placeholder="Button text"
              className={`${inputClass} flex-1`}
            />
            <input
              value={cta.link}
              onChange={(e) => updateCta(i, 'link', e.target.value)}
              placeholder="/contact"
              className={`${inputClass} flex-1`}
            />
          </div>
        ))}
      </div>

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

function StepsSection() {
  const [items, setItems] = useState<HowItWorksStep[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase.from('how_it_works_steps').select('*').order('sort_order', { ascending: true })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const addStep = async () => {
    const nextNumber = items.length > 0 ? Math.max(...items.map((i) => i.step_number)) + 1 : 1
    const { error } = await supabase.from('how_it_works_steps').insert({
      step_number: nextNumber,
      phase_label: 'PHASE',
      title: 'New step',
      description: 'Describe what happens in this step.',
      sort_order: items.length,
    })
    if (!error) fetchItems()
  }

  const updateField = (id: string, field: keyof HowItWorksStep, value: string | number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  const saveStep = async (item: HowItWorksStep) => {
    setSavingId(item.id)
    await supabase
      .from('how_it_works_steps')
      .update({
        step_number: item.step_number,
        phase_label: item.phase_label,
        title: item.title,
        description: item.description,
      })
      .eq('id', item.id)
    setSavingId(null)
  }

  const toggleActive = async (item: HowItWorksStep) => {
    await supabase.from('how_it_works_steps').update({ active: !item.active }).eq('id', item.id)
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, active: !i.active } : i)))
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this step?')) return
    await supabase.from('how_it_works_steps').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    setItems(reordered)
    await Promise.all(reordered.map((item, i) => supabase.from('how_it_works_steps').update({ sort_order: i }).eq('id', item.id)))
  }

  const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Steps</h2>
        <button
          onClick={addStep}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add step
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-gray-400" /></div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-400 py-4">No steps yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button onClick={() => move(index, -1)} disabled={index === 0} className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-25">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-25">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="number"
                  value={item.step_number}
                  onChange={(e) => updateField(item.id, 'step_number', Number(e.target.value))}
                  className={`${inputClass} w-16 flex-shrink-0`}
                />
                <input
                  value={item.phase_label}
                  onChange={(e) => updateField(item.id, 'phase_label', e.target.value)}
                  placeholder="WEEK 0 · DISCOVERY"
                  className={`${inputClass} flex-1`}
                />
                {!item.active && <EyeOff className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />}
                <button onClick={() => toggleActive(item)} className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex-shrink-0">
                  {item.active ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => remove(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                value={item.title}
                onChange={(e) => updateField(item.id, 'title', e.target.value)}
                placeholder="Step title"
                className={`${inputClass} font-medium`}
              />
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => updateField(item.id, 'description', e.target.value)}
                placeholder="Step description"
                className={`${inputClass} resize-none`}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => saveStep(item)}
                  disabled={savingId === item.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#001f54] text-white rounded-lg text-xs font-medium hover:bg-[#002a6e] disabled:opacity-60"
                >
                  {savingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
