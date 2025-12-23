# Vercel + Sanity Integration Guide

## How Images and Content Update on Vercel

### ✅ Yes, Images Will Reflect Immediately!

**Sanity images are served from Sanity's CDN**, not from Vercel. When you publish an image in Sanity:
- ✅ Image is immediately available via Sanity CDN
- ✅ Image URLs are generated on-the-fly
- ✅ No Vercel rebuild needed for images

### Content Updates

For **content updates** (text, data), you have two options:

## Option 1: Automatic Revalidation (Recommended)

The pages are configured with **ISR (Incremental Static Regeneration)**:
- Pages revalidate every 60 seconds automatically
- Fresh content appears within 60 seconds of publishing

**No additional setup needed!** This is already configured in `app/test-cms/page.tsx`.

## Option 2: Instant Updates via Webhook (Advanced)

For **instant updates** when you publish in Sanity:

### Step 1: Set Up Webhook Secret

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `SANITY_REVALIDATE_SECRET`
   - **Value**: Generate a random secret (e.g., use `openssl rand -base64 32`)
   - **Environment**: Production, Preview, Development

### Step 2: Configure Sanity Webhook

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Webhooks**
4. Click **Create webhook**
5. Configure:
   - **Name**: Vercel Revalidation
   - **URL**: `https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type == "outdoorKitchenModel"`
   - **HTTP method**: POST
   - **API version**: v2021-03-25
6. Click **Save**

### Step 3: Test

1. Publish content in Sanity
2. Check Vercel logs to see revalidation
3. Content updates instantly!

## Option 3: Use Vercel's Sanity Integration (Easiest)

1. Go to Vercel Dashboard → Your Project → Integrations
2. Search for "Sanity"
3. Click **Add Integration**
4. Connect your Sanity project
5. Vercel will automatically revalidate on publish!

## Current Configuration

✅ **ISR Enabled**: Pages revalidate every 60 seconds
✅ **Webhook Endpoint**: `/api/revalidate` (ready to use)
✅ **Image URLs**: Generated dynamically from Sanity CDN

## Testing

1. **Publish an image in Sanity**
2. **Check Vercel site** - Image should appear immediately (served from Sanity CDN)
3. **Publish content** - Should appear within 60 seconds (or instantly with webhook)

## Troubleshooting

**Images not showing?**
- Check image URL in browser console
- Verify Sanity Project ID is correct in Vercel environment variables
- Check image is published (not draft)

**Content not updating?**
- Wait 60 seconds for ISR revalidation
- Or set up webhook for instant updates
- Check Vercel function logs for webhook errors

## Environment Variables in Vercel

Make sure these are set in Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (usually "production")
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version (2024-01-01)
- `SANITY_REVALIDATE_SECRET` - (Optional, for webhook)

