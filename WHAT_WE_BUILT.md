# What We Built — Coppola Home Website

This document explains, in plain English, everything that was built and changed on the Coppola Home website. No technical jargon.

---

## The Big Picture

Your website now has two parts:

1. **The public-facing store** — what your customers see when they visit the site
2. **The admin panel** — a private back office that only you (the owner) can log into

Everything is connected to a live database. That means when you add a product in the admin panel, it shows up on the website automatically — no developer needed.

---

## Part 1: The Admin Panel

**What it is:** A private area of your website, hidden from customers, where you manage everything.

**How to access it:** Go to your website address and add `/admin` at the end (e.g., `yoursite.com/admin`). You'll be asked to log in with your email and password.

### What you can do in the admin panel:

**Products**
- Add new products with photos, name, brand, description, and all specifications
- Edit any existing product at any time
- Delete products you no longer carry
- Mark products as "In Stock" or "Out of Stock"
- Mark products as featured (to highlight them on the site)
- Organise products by category: Vanities, Faucets, Mirrors, Sinks, Toilets, Quartz Countertops, Flooring

**Leads (Customer Inquiries)**
- See every contact form submission and quote request in one place
- Each lead shows the customer's name, email, phone, and their message
- Mark leads as New, Read, or Replied so you can track follow-ups
- Click a button to reply by email directly from the panel

**Gallery (Our Works)**
- Upload photos of completed projects
- Edit or remove gallery images at any time

---

## Part 2: The Database

**What it is:** Think of it like a filing cabinet that lives on the internet, not on anyone's computer.

Before this work, all your product information was written directly into the website code — like painting the menu onto the wall of a restaurant. To change anything, a developer had to rewrite the code and redeploy the site.

Now, all product data lives in a database called **Supabase**. The website reads from it in real time. This means:

- You add a product → it appears on the site within seconds
- You change a price or description → the site updates immediately
- You delete a product → it disappears from the site
- No developer needs to touch any code for routine product management

### What's stored in the database:

| What | Details stored |
|------|---------------|
| Products | Name, brand, category, images, description, specs, filters, in-stock status |
| Leads | Customer name, email, phone, message, type (contact or quote), date |
| Gallery | Project photos, title, description |

---

## Part 3: Product Photos

**Where they live:** Photos are stored in a secure image storage service (also part of Supabase). When you upload a photo through the admin panel, it gets stored there and the website automatically shows it.

You do not need to manage folders, resize images, or use any separate service. Upload the photo — done.

---

## Part 4: The Public Website — What Changed

Every product category page on your website now loads products directly from the database instead of showing a fixed, hardcoded list.

### Pages that were updated:

- **Vanities** — shows all vanities from the database, filterable by size, finish, and brand
- **Quartz Countertops** — shows all quartz slabs, filterable by collection and thickness
- **Kitchen Faucets** — shows faucets tagged as "Kitchen"
- **Bathroom Faucets** — shows faucets tagged as "Bathroom", with collection browsing
- **Shower Sets** — shows faucets tagged as "Shower"
- **Mirrors** — all mirror sub-pages (Explore, Modern, Timeless, Contemporary) load from the database
- **Sinks** — all sink sub-pages (Explore, Kitchen, Bathroom, Undermount, Vessel) load from the database
- **Toilets** — shows all toilets, split into Intelligent and Regular categories
- **Flooring** — shows all flooring, filterable by type (Engineered Hardwood, Luxury Vinyl, LooseLay)

### What customers see while the page loads:

Instead of a blank screen or broken layout, customers see a subtle "shimmer" placeholder (a greyed-out version of the page) while the products load. This typically takes under a second.

### Individual product pages:

Every product has its own dedicated page (e.g., `yoursite.com/products/vanities/product-name`). These pages show:
- All product photos (with the ability to scroll through them)
- Full description
- Specifications table
- Related products from the same category

---

## Part 5: The Contact and Quote Forms

Both the Contact Us form and the Get a Quote form now actually save submissions.

Before: When a customer filled out a form, the information went nowhere — it was just lost.

Now: Every submission is saved to the database and appears in your admin panel under "Leads" within seconds.

---

## Part 6: Security

- The admin panel requires a login. Nobody can access it without your email and password.
- Customers can only read product and gallery data — they cannot change anything.
- The only action customers can take is submitting a contact or quote form.
- Image storage is also protected — only logged-in admins can upload or delete photos.

---

## Part 7: Where It's Hosted

| Service | What it does |
|---------|-------------|
| **Vercel** | Hosts the website itself — the pages customers see |
| **Supabase** | Stores all data (products, leads, gallery) and images |

Both services have free tiers that are more than sufficient for your current traffic. As the business grows, both can scale up affordably.

---

## What You Need to Do to Add a Product

1. Go to `yoursite.com/admin` and log in
2. Click "Products" in the left menu
3. Click "Add Product"
4. Fill in the name, brand, category, description, and specs
5. Upload photos
6. Toggle "In Stock" on
7. Click Save

The product is live on your website immediately.

---

## What Was NOT Changed

- The overall look and feel of the website — the design, fonts, colours, and layout are all identical to before
- The navigation, the home page, the about page, and all other non-product pages
- No existing URLs were broken — all links work as before

---

## Summary

| Before | After |
|--------|-------|
| Products were hardcoded — changing anything required a developer | Products are managed by you through the admin panel |
| Contact and quote forms didn't save anything | All submissions are saved and visible in the admin panel |
| Photos had to be added by a developer | Photos are uploaded directly through the admin panel |
| No way to see customer inquiries in one place | All leads are visible, trackable, and actionable in the admin panel |
| Any update required redeploying the website | Updates are instant — no code changes needed |
