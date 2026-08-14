# Setup Guide — Coppola Home Website

This file walks through everything that needs to be configured once to make the website fully operational. Most of this only needs to be done a single time.

---

## Table of Contents

1. [Environment Variables](#1-environment-variables)
2. [Supabase Database](#2-supabase-database)
3. [Supabase Storage (Images)](#3-supabase-storage-images)
4. [Admin Account](#4-admin-account)
5. [Email Notifications](#5-email-notifications)
6. [Vercel Deployment](#6-vercel-deployment)

---

## 1. Environment Variables

The website needs two keys to talk to Supabase. Create a file called `.env` in the root of this project:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Where to find these:
1. Go to your Supabase dashboard → your project
2. Click **Settings** (gear icon) → **API**
3. Copy the **Project URL** → paste as `VITE_SUPABASE_URL`
4. Copy the **anon / public** key → paste as `VITE_SUPABASE_ANON_KEY`

> The `.env` file is never uploaded to GitHub. On Vercel, add these same two values under **Project Settings → Environment Variables**.

---

## 2. Supabase Database

The database tables need to be created once. The full SQL is in `supabase/schema.sql`.

To run it:
1. Go to your Supabase dashboard → your project
2. Click **SQL Editor** in the left menu
3. Paste the entire contents of `supabase/schema.sql`
4. Click **Run**

This creates three tables:
- `products` — all your products
- `leads` — contact and quote form submissions
- `gallery` — your portfolio / Our Works photos

---

## 3. Supabase Storage (Images)

Two storage buckets need to be created manually for product and gallery image uploads.

1. Go to Supabase dashboard → **Storage**
2. Click **New bucket** → name it `product-images` → set to **Public** → Create
3. Click **New bucket** again → name it `gallery-images` → set to **Public** → Create

Then add upload permissions so the admin panel can write to them. Go to **SQL Editor** and run:

```sql
-- Allow authenticated users to upload product images
create policy "Admin upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

create policy "Admin update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images');

create policy "Admin delete product images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images');

create policy "Public read product images"
on storage.objects for select
to public
using (bucket_id = 'product-images');

-- Same for gallery images
create policy "Admin upload gallery images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'gallery-images');

create policy "Admin update gallery images"
on storage.objects for update
to authenticated
using (bucket_id = 'gallery-images');

create policy "Admin delete gallery images"
on storage.objects for delete
to authenticated
using (bucket_id = 'gallery-images');

create policy "Public read gallery images"
on storage.objects for select
to public
using (bucket_id = 'gallery-images');
```

---

## 4. Admin Account

The admin panel is at `/admin` on your website. It requires a login.

To create your admin login:
1. Go to Supabase dashboard → **Authentication** → **Users**
2. Click **Invite user** (or **Add user**)
3. Enter `admin@coppolahome.ca` and set a strong password
4. Click Create

You can now log into the admin panel at `yoursite.com/admin` with those credentials.

> To change your password later: Supabase dashboard → Authentication → Users → click your user → Update password.

---

## 5. Email Notifications

Every time a customer submits the contact form or quote form, you need to receive an email at `admin@coppolahome.ca`. This is handled by a Supabase Edge Function called `notify-lead` (the code lives at `supabase/functions/notify-lead/index.ts`).

It uses a free service called **Resend** to send the emails.

### Step 1 — Create a Resend account

1. Go to [https://resend.com](https://resend.com) and sign up (free)
2. In the Resend dashboard, go to **Domains** → **Add Domain**
3. Add `coppolacontracting.net` and follow the DNS verification steps (adds a few records to your domain — takes a few minutes)
4. Once verified, go to **API Keys** → **Create API Key** → copy it

### Step 2 — Install the Supabase CLI (if not already installed)

```bash
npm install -g supabase
```

### Step 3 — Log in and link your project

Run these commands from inside the project folder:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

Your project ref is in your Supabase dashboard URL:
`https://supabase.com/dashboard/project/YOUR_PROJECT_REF`

### Step 4 — Deploy the Edge Function

```bash
supabase functions deploy notify-lead
```

### Step 5 — Add your Resend API key as a secret

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

Replace `re_xxxxxxxxxxxxxxxx` with the key you copied from Resend.

### Step 6 — Create the Database Webhook

This tells Supabase to call the Edge Function every time a new lead is saved.

1. Go to Supabase dashboard → **Database** → **Webhooks**
2. Click **Create a new hook**
3. Fill in:
   - **Name**: `notify-lead-on-insert`
   - **Table**: `leads`
   - **Events**: tick `INSERT` only
   - **Type**: Supabase Edge Functions
   - **Edge Function**: `notify-lead`
4. Click **Create webhook**

### What the email looks like

When a customer submits a form, you will receive a formatted email showing:
- Their name, email, and phone number
- For quote requests: project type, timeline, scope, address, and preferred contact method
- Their message
- A button linking directly to the lead in your admin panel
- The reply-to is automatically set to the customer's email — so you can just hit Reply

### Testing

Submit a test contact message through the website. You should receive an email within a few seconds. If you don't, check Supabase dashboard → **Edge Functions** → `notify-lead` → **Logs** for any errors.

---

## 6. Vercel Deployment

The website is deployed on Vercel. The `vercel.json` file at the root is already configured to handle all routes correctly (so page refreshes don't break).

To deploy:
1. Push this repository to GitHub
2. Go to [https://vercel.com](https://vercel.com) → Import project → connect your GitHub repo
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   (same values as your local `.env` file)
4. Click Deploy

Every time you push to the main branch, Vercel automatically rebuilds and redeploys the site.

---

## Summary Checklist

- [ ] `.env` file created with Supabase URL and anon key
- [ ] Database tables created via `supabase/schema.sql`
- [ ] `product-images` storage bucket created (public)
- [ ] `gallery-images` storage bucket created (public)
- [ ] Storage RLS policies applied (SQL above)
- [ ] Admin user created in Supabase Authentication
- [ ] Resend account created and domain verified
- [ ] Edge Function deployed (`supabase functions deploy notify-lead`)
- [ ] Resend API key added as secret
- [ ] Database webhook created pointing to `notify-lead`
- [ ] Environment variables added to Vercel
- [ ] Site deployed on Vercel
