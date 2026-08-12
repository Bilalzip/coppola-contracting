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
