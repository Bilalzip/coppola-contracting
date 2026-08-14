import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, Mail, Image, Quote, Building2, BadgeCheck, ListOrdered, Settings, Paintbrush, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const contentNavItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/leads', icon: Mail, label: 'Leads' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/testimonials', icon: Quote, label: 'Testimonials' },
  { to: '/admin/brands', icon: Building2, label: 'Partnered Brands' },
  { to: '/admin/trust-bar', icon: BadgeCheck, label: 'Trust Bar' },
  { to: '/admin/how-it-works', icon: ListOrdered, label: 'How It Works' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
]

const appearanceNavItems = [
  { to: '/admin/appearance/home', label: 'Home' },
  { to: '/admin/appearance/about', label: 'About Us' },
  { to: '/admin/appearance/custom-cabinetry', label: 'Custom Cabinetry' },
  { to: '/admin/appearance/our-expertise', label: 'Our Expertise' },
  { to: '/admin/appearance/our-works', label: 'Our Works' },
  { to: '/admin/appearance/contact', label: 'Contact' },
  { to: '/admin/appearance/get-quote', label: 'Get a Quote' },
  { to: '/admin/appearance/products', label: 'Products' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div>
          <h1 className="text-lg font-bold">Coppola Home</h1>
          <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {contentNavItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </NavLink>
        ))}

        <div className="pt-5 mt-4 border-t border-gray-700">
          <p className="px-4 pb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <Paintbrush className="w-3.5 h-3.5" />
            Appearance
          </p>
          {appearanceNavItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block pl-11 pr-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-3">
        {user?.email && (
          <div className="px-4">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="text-sm text-gray-200 truncate" title={user.email}>{user.email}</p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:w-64">
        <div className="flex flex-col w-64 fixed inset-y-0">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-sm font-semibold text-gray-900">Coppola Admin</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
