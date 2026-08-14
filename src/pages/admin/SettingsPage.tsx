import { useEffect, useState } from 'react'
import { Loader2, Plus, Trash2, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { BusinessHour, SiteSettings } from '../../types/database'

type FormState = Omit<SiteSettings, 'id' | 'updated_at'>

const defaultForm: FormState = {
  phone: '',
  email: '',
  address_line1: '',
  address_line2: '',
  hours: [],
  hours_note: '',
  facebook_url: '',
  instagram_url: '',
  linkedin_url: '',
}

export default function SettingsPage() {
  const [form, setForm] = useState<FormState>(defaultForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', true).single().then(({ data }) => {
      if (data) {
        setForm({
          phone: data.phone,
          email: data.email,
          address_line1: data.address_line1,
          address_line2: data.address_line2,
          hours: data.hours,
          hours_note: data.hours_note,
          facebook_url: data.facebook_url ?? '',
          instagram_url: data.instagram_url ?? '',
          linkedin_url: data.linkedin_url ?? '',
        })
      }
      setLoading(false)
    })
  }, [])

  const updateHour = (index: number, field: keyof BusinessHour, value: string) => {
    setForm((prev) => ({
      ...prev,
      hours: prev.hours.map((h, i) => (i === index ? { ...h, [field]: value } : h)),
    }))
  }

  const addHourRow = () => {
    setForm((prev) => ({ ...prev, hours: [...prev.hours, { days: '', time: '' }] }))
  }

  const removeHourRow = (index: number) => {
    setForm((prev) => ({ ...prev, hours: prev.hours.filter((_, i) => i !== index) }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)
    const payload = {
      phone: form.phone,
      email: form.email,
      address_line1: form.address_line1,
      address_line2: form.address_line2,
      hours: form.hours,
      hours_note: form.hours_note,
      facebook_url: form.facebook_url || null,
      instagram_url: form.instagram_url || null,
      linkedin_url: form.linkedin_url || null,
    }
    const { error } = await supabase.from('site_settings').update(payload).eq('id', true)
    setSaving(false)
    if (error) {
      setError(error.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Business contact info, hours, and social links shown across the site (footer, contact page, and forms).
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-8">
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

        {/* Contact */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Phone</label>
              <input
                required
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className={inputClass}
                placeholder="+1 (807) 345 9989"
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className={inputClass}
                placeholder="info@coppolahome.ca"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Address line 1</label>
              <input
                value={form.address_line1}
                onChange={(e) => setForm((p) => ({ ...p, address_line1: e.target.value }))}
                className={inputClass}
                placeholder="269 Red River Rd, Suite 116 #1040"
              />
            </div>
            <div>
              <label className={labelClass}>Address line 2</label>
              <input
                value={form.address_line2}
                onChange={(e) => setForm((p) => ({ ...p, address_line2: e.target.value }))}
                className={inputClass}
                placeholder="Thunder Bay ON, P7B 1A9, Canada"
              />
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Showroom Hours</h2>
            <button
              type="button"
              onClick={addHourRow}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add row
            </button>
          </div>
          <div className="space-y-2">
            {form.hours.map((hour, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={hour.days}
                  onChange={(e) => updateHour(i, 'days', e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="Mon – Fri"
                />
                <input
                  value={hour.time}
                  onChange={(e) => updateHour(i, 'time', e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="9:00 AM – 5:00 PM"
                />
                <button
                  type="button"
                  onClick={() => removeHourRow(i)}
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {form.hours.length === 0 && (
              <p className="text-sm text-gray-400">No hours added yet — click "Add row".</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Hours note (optional)</label>
            <input
              value={form.hours_note}
              onChange={(e) => setForm((p) => ({ ...p, hours_note: e.target.value }))}
              className={inputClass}
              placeholder="*Closed on statutory holidays"
            />
          </div>
        </div>

        {/* Social links */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Social Links</h2>
          <p className="text-xs text-gray-500 -mt-2">Leave blank to hide that icon on the site.</p>
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input
              value={form.facebook_url ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, facebook_url: e.target.value }))}
              className={inputClass}
              placeholder="https://facebook.com/coppolahome"
            />
          </div>
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input
              value={form.instagram_url ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, instagram_url: e.target.value }))}
              className={inputClass}
              placeholder="https://instagram.com/coppolahome"
            />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input
              value={form.linkedin_url ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, linkedin_url: e.target.value }))}
              className={inputClass}
              placeholder="https://linkedin.com/company/coppolahome"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
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
    </div>
  )
}
