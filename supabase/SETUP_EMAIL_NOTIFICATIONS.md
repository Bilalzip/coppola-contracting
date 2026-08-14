# Email Notification Setup

This explains how to activate automatic email alerts to info@coppolahome.ca every time someone submits a contact or quote form.

## How it works

1. Customer submits a form → saved to the database
2. Supabase detects the new row → triggers the Edge Function
3. Edge Function sends a formatted email via Resend API
4. You receive the email at info@coppolahome.ca within seconds

---

## Step 1 — Create a Resend account

1. Go to https://resend.com and sign up (free)
2. Add and verify your domain `coppolacontracting.net` under **Domains**
3. Go to **API Keys** → Create a new API key → copy it

---

## Step 2 — Deploy the Edge Function

In your terminal, inside this project folder:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase functions deploy notify-lead
```

Your project ref is the string in your Supabase dashboard URL:
`https://supabase.com/dashboard/project/YOUR_PROJECT_REF`

---

## Step 3 — Add the Resend API key as a secret

```bash
npx supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

---

## Step 4 — Create the Database Webhook in Supabase

1. Go to your Supabase dashboard → **Database** → **Webhooks**
2. Click **Create a new hook**
3. Fill in:
   - **Name**: `notify-lead-on-insert`
   - **Table**: `leads`
   - **Events**: Check `INSERT` only
   - **Type**: Supabase Edge Functions
   - **Edge Function**: `notify-lead`
4. Click **Create webhook**

That's it. Every new lead now triggers an email instantly.

---

## Email format

The email you receive will show:
- Customer name, email, phone
- For quotes: project type, timeline, scope, address, preferred contact method
- Their message
- A direct link to the admin panel to view the lead
- The reply-to is set to the customer's email so you can reply directly

---

## Testing

Submit a test message through the contact form or quote form on the live site.
You should receive an email within a few seconds.
