export interface Product {
  id: string
  name: string
  slug: string
  category: 'vanity' | 'quartz' | 'faucet' | 'mirror' | 'sink' | 'toilet' | 'flooring' | 'lighting' | 'hardware'
  brand: string | null
  description: string | null
  short_description: string | null
  specs: { label: string; value: string }[]
  tags: string[]
  in_stock: boolean
  is_catalogue: boolean
  price: number | null
  stock_quantity: number | null
  images: string[]
  filters: Record<string, string>
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  type: 'contact' | 'quote'
  name: string
  email: string
  phone: string | null
  message: string | null
  project_type: string | null
  timeline: string | null
  budget: string | null
  address: string | null
  preferred_contact: string | null
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export interface GalleryItem {
  id: string
  title: string
  description: string | null
  images: string[]
  category: string | null
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  quote: string
  rating: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Brand {
  id: string
  name: string
  logo_url: string
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface TrustBarStat {
  id: string
  icon: string
  label: string
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface PressLogo {
  id: string
  name: string
  logo_url: string
  link_url: string | null
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface HowItWorksStep {
  id: string
  step_number: number
  phase_label: string
  title: string
  description: string
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface BusinessHour {
  days: string
  time: string
}

export interface PageSection {
  id: string
  page_key: string
  section_key: string
  sort_order: number
  label: string
  heading: string | null
  subheading: string | null
  body: string | null
  image_url: string | null
  video_url: string | null
  heading_color: string | null
  subheading_color: string | null
  body_color: string | null
  items: unknown[]
  updated_at: string
}

export interface SiteSettings {
  id: true
  phone: string
  email: string
  address_line1: string
  address_line2: string
  hours: BusinessHour[]
  hours_note: string
  facebook_url: string | null
  instagram_url: string | null
  linkedin_url: string | null
  notification_emails: string[]
  updated_at: string
}
