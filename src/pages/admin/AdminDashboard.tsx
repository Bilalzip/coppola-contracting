import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Mail, Image, TrendingUp } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, leads: 0, gallery: 0, newLeads: 0 })
  const [recentLeads, setRecentLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [productsRes, leadsRes, galleryRes, newLeadsRes, recentLeadsRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('gallery').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5)
      ])

      setStats({
        products: productsRes.count ?? 0,
        leads: leadsRes.count ?? 0,
        gallery: galleryRes.count ?? 0,
        newLeads: newLeadsRes.count ?? 0,
      })
      setRecentLeads(recentLeadsRes.data ?? [])
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-blue-50 text-blue-600', link: '/admin/products' },
    { label: 'Total Leads', value: stats.leads, icon: Mail, color: 'bg-green-50 text-green-600', link: '/admin/leads' },
    { label: 'New Leads', value: stats.newLeads, icon: TrendingUp, color: 'bg-orange-50 text-orange-600', link: '/admin/leads' },
    { label: 'Gallery Items', value: stats.gallery, icon: Image, color: 'bg-purple-50 text-purple-600', link: '/admin/gallery' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, link }) => (
            <Link key={label} to={link} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                <div className={`p-2 rounded-xl ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Recent Leads */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Recent Leads</h2>
          <Link to="/admin/leads" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentLeads.length === 0 ? (
            <p className="text-sm text-gray-500 p-6">No leads yet.</p>
          ) : (
            recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.email} · {lead.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    lead.status === 'new' ? 'bg-orange-100 text-orange-700' :
                    lead.status === 'read' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-xs text-gray-400">{new Date(lead.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
