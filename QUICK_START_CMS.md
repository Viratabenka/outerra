# Quick Start: Testing CMS Functionality

## 🚀 Quick Setup (5 minutes)

### 1. Create Sanity Account & Project
- Go to: https://www.sanity.io/manage
- Sign up/Login
- Click "Create project"
- Name: `Outerra`
- Dataset: `production`
- **Copy your Project ID** (looks like: `abc123xyz`)

### 2. Set Environment Variables
Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Replace `your-project-id-here` with your actual Project ID**

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access Sanity Studio
Open: **http://localhost:3000/studio**

- Login with your Sanity account
- Grant permissions to your project
- You should see "Outdoor Kitchen Model" in the sidebar

### 5. Create Your First Content
1. Click "Outdoor Kitchen Model" → "Create"
2. Fill in:
   - **Title**: "Classic Series"
   - **Description**: "A beautiful classic outdoor kitchen..."
   - **Hero Image**: Upload an image
   - **Module Types**: Add at least one (e.g., "Grill")
   - **Material Finishes**: Add at least one (e.g., "Stainless Steel")
3. Click **"Publish"**

### 6. View Your Content
Open: **http://localhost:3000/test-cms**

You should see your "Classic Series" model displayed!

## ✅ Success Checklist

- [ ] Sanity project created
- [ ] `.env.local` file created with Project ID
- [ ] Dev server running (`npm run dev`)
- [ ] Can access `/studio` route
- [ ] Logged into Sanity Studio
- [ ] Created and published at least one Outdoor Kitchen Model
- [ ] Can see content on `/test-cms` page

## 🐛 Troubleshooting

**"Missing environment variable" error?**
- Check `.env.local` exists
- Restart dev server after creating `.env.local`

**Can't access `/studio`?**
- Make sure `next-sanity` is installed: `npm install next-sanity`
- Check browser console for errors

**No data on test page?**
- Verify Project ID is correct
- Make sure content is **published** (not just saved as draft)
- Check dataset name matches (production vs development)

## 📚 Next Steps

- Read full guide: `CMS_TESTING_GUIDE.md`
- Integrate CMS data into Configurator component
- Replace hardcoded models with Sanity data

