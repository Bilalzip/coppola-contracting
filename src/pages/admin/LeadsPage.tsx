import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Mail, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Lead } from '../../types/database'

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-orange-100 text-orange-700',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  async function fetchLeads() {
    setLoading(true)
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false })
    if (typeFilter) query = query.eq('type', typeFilter)
    if (statusFilter) query = query.eq('status', statusFilter)
    const { data } = await query
    setLeads(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [typeFilter, statusFilter])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('leads').update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: status as Lead['status'] } : l))
  }

  const deleteLead = async (id: string, name: string) => {
    if (!window.confirm(`Delete lead from "${name}"?`)) return
    await supabase.from('leads').delete().eq('id', id)
    setLeads(prev => prev.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-sm text-gray-500 mt-1">{leads.length} submissions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Types</option>
          <option value="contact">Contact</option>
          <option value="quote">Quote Request</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No leads yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {leads.map(lead => (
              <div key={lead.id}>
                <div
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[lead.status]}`}>
                        {lead.status}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium capitalize">
                        {lead.type === 'quote' ? 'Quote Request' : 'Contact'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{lead.email} {lead.phone ? `· ${lead.phone}` : ''}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-400">{new Date(lead.created_at).toLocaleDateString()}</span>
                    {expandedId === lead.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>

                {expandedId === lead.id && (
                  <div className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-3">
                        {lead.message && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Message</p>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.message}</p>
                          </div>
                        )}
                        {lead.address && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</p>
                            <p className="text-sm text-gray-700">{lead.address}</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {lead.project_type && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Project Type</p>
                            <p className="text-sm text-gray-700 capitalize">{lead.project_type.replace(/-/g, ' ')}</p>
                          </div>
                        )}
                        {lead.timeline && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Timeline</p>
                            <p className="text-sm text-gray-700">{lead.timeline}</p>
                          </div>
                        )}
                        {lead.budget && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Scope</p>
                            <p className="text-sm text-gray-700">{lead.budget}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-200">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Status</label>
                        <select
                          value={lead.status}
                          onChange={e => updateStatus(lead.id, e.target.value)}
                          onClick={e => e.stopPropagation()}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </div>
                      <a
                        href={`mailto:${lead.email}`}
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Reply via Email
                      </a>
                      <button
                        onClick={e => { e.stopPropagation(); deleteLead(lead.id, lead.name) }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
