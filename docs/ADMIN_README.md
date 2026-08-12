# Coppola Home Admin Dashboard

## Overview
This project now includes a comprehensive, professional admin dashboard that operates separately from the main website. The admin dashboard provides full control over content management, product inventory, and site administration.

## Access Information

### Login Credentials
- **Username:** `admin`
- **Password:** `password123`

### Access URLs
- **Admin Login:** `/admin/login`
- **Professional Dashboard:** `/admin/dashboard-pro`
- **Legacy Dashboard:** `/admin/dashboard`

## Features

### 🏠 Dashboard Overview
- Comprehensive statistics and metrics
- Recent activity feed
- Quick action buttons
- Revenue and performance tracking

### 📝 Blog Post Management
- Create, edit, and delete blog posts
- Advanced SEO options
- Content preview functionality
- Draft and published status management

### 📦 In-Stock Product Management
- **Add new products** with comprehensive details
- **Image upload and management** (multiple images per product)
- **Product specifications** (custom key-value pairs)
- **Stock level tracking** (in-stock, low-stock, out-of-stock)
- **Featured product** designation
- **Category organization**
- **Price and inventory management**

### 📊 Analytics Dashboard
- Performance metrics
- Traffic analysis
- User engagement data
- Revenue tracking

### 👥 User Management
- User account administration
- Role and permission management
- User activity monitoring

### 🖼️ Media Library
- File upload and organization
- Image management
- Asset optimization

### 🔍 SEO Tools
- Meta tag management
- Keyword optimization
- Search engine analytics
- Performance monitoring

### 💾 Backup & Restore
- Site backup creation
- Data restoration
- Version control

### ⚙️ Settings
- Site configuration
- Theme customization
- System preferences

## Product Management Features

### Adding New Products
1. Navigate to **In-Stock Products** tab
2. Click **"Add Product"** button
3. Fill in product details:
   - **Basic Info:** Name, category, description, price, stock quantity
   - **Status:** In-stock, low-stock, or out-of-stock
   - **Featured:** Mark for homepage display
   - **Images:** Upload multiple product images
   - **Specifications:** Add custom product details (material, dimensions, style, etc.)

### Product Categories
- Kitchen Cabinets
- Bathroom Vanities
- Countertops
- Hardware
- Lighting
- Flooring
- Appliances
- Accessories

### Image Management
- Support for multiple image formats (PNG, JPG, GIF)
- Drag and drop upload interface
- Image preview and removal
- Automatic image optimization

## Technical Details

### Architecture
- **Separate Layout:** Admin dashboard uses `AdminLayout` component
- **No Website Header/Footer:** Clean, focused admin interface
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Modern UI:** Built with Tailwind CSS and Lucide React icons

### State Management
- Local state management with React hooks
- Real-time statistics updates
- Persistent data storage (localStorage for demo)

### Security
- Protected routes with authentication
- Admin-only access
- Session management

## Getting Started

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to admin login:**
   ```
   http://localhost:5173/admin/login
   ```

3. **Login with credentials:**
   - Username: `admin`
   - Password: `password123`

4. **Access the professional dashboard:**
   ```
   http://localhost:5173/admin/dashboard-pro
   ```

## Development Notes

### File Structure
```
src/
├── layouts/
│   └── AdminLayout.tsx          # Admin-specific layout
├── pages/admin/
│   ├── AdminLogin.tsx           # Login page
│   ├── AdminDashboard.tsx       # Legacy dashboard
│   └── AdminDashboardPro.tsx    # Professional dashboard
├── components/
│   ├── ProductManager.tsx       # Product management
│   └── CreatePostButton.tsx     # Blog post creation
```

### Key Components
- **AdminDashboardPro:** Main dashboard component
- **ProductManager:** Comprehensive product management
- **AdminLayout:** Clean admin interface wrapper

### Styling
- Tailwind CSS for consistent design
- Custom CSS utilities for admin-specific features
- Responsive grid layouts
- Professional color scheme

## Future Enhancements

- Database integration
- Real-time notifications
- Advanced analytics
- User role management
- API endpoints
- File upload to cloud storage
- Email notifications
- Advanced search and filtering

## Support

For technical support or feature requests, contact the development team.
