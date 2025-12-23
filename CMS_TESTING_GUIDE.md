# CMS Testing Guide for Outerra

This guide will help you test the Sanity CMS functionality step by step.

## Step 1: Create a Sanity Project

1. **Sign up/Login to Sanity**:
   - Go to [https://www.sanity.io](https://www.sanity.io)
   - Sign up for a free account or log in

2. **Create a New Project**:
   - Click "Create project"
   - Project name: `Outerra` (or any name you prefer)
   - Choose a dataset name: `production` (or `development` for testing)
   - Click "Create project"

3. **Get Your Project Credentials**:
   - After creating, you'll see your **Project ID** (looks like: `abc123xyz`)
   - Note the **Dataset name** (usually `production`)

## Step 2: Configure Environment Variables

1. **Create `.env.local` file** in the root directory:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```

2. **Replace `your-project-id-here`** with your actual Project ID from Step 1

## Step 3: Access Sanity Studio Locally

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open Sanity Studio**:
   - Navigate to: `http://localhost:3000/studio`
   - You should see the Sanity Studio interface

3. **Login to Sanity**:
   - Click "Login" or "Sign in"
   - Use your Sanity account credentials
   - Grant permissions to your project

## Step 4: Create Your First Content

1. **In Sanity Studio** (`http://localhost:3000/studio`):
   - Click on "Outdoor Kitchen Model" in the sidebar
   - Click "Create" button

2. **Fill in the form**:
   - **Title**: "Classic Series"
   - **Slug**: Auto-generated from title (or click "Generate")
   - **Description**: "Timeless elegance with traditional design elements. Perfect for those who appreciate classic outdoor kitchen aesthetics."
   - **Hero Image**: Click to upload an image
   - **Module Types**: Click "Add item" and add:
     - Name: "Built-in Grill", Description: "Professional-grade gas grill"
     - Name: "Stainless Steel Sink", Description: "Weather-resistant sink"
   - **Material Finishes**: Click "Add item" and add:
     - Name: "Stainless Steel", Description: "Durable and easy to maintain", Color: "#C0C0C0"
   - **Price**: 8999
   - **Featured**: Toggle ON
   - **Published At**: Select current date/time

3. **Publish**:
   - Click "Publish" button in the top right
   - Your content is now saved to Sanity!

## Step 5: Test Data Fetching

1. **View the Test Page**:
   - Navigate to: `http://localhost:3000/test-cms`
   - This page will display all your Outdoor Kitchen Models from Sanity

2. **Verify Data**:
   - You should see the "Classic Series" model you just created
   - Check that all fields are displaying correctly

## Step 6: Test in Your Application

The CMS data can be used in any component. Example:

```typescript
import { client } from "@/sanity/client";

// Fetch all models
const models = await client.fetch(`
  *[_type == "outdoorKitchenModel"] {
    _id,
    title,
    description,
    heroImage,
    moduleTypes,
    materialFinishes,
    price,
    featured
  }
`);

// Fetch featured models only
const featuredModels = await client.fetch(`
  *[_type == "outdoorKitchenModel" && featured == true] {
    _id,
    title,
    description,
    price
  }
`);
```

## Step 7: Deploy Sanity Studio (Optional)

To access Sanity Studio from anywhere:

```bash
npx sanity deploy
```

This will deploy your studio to `https://your-project.sanity.studio`

## Troubleshooting

### Issue: "Missing environment variable" error
- **Solution**: Make sure `.env.local` exists and has all required variables
- Restart the dev server after creating/updating `.env.local`

### Issue: Can't access `/studio` route
- **Solution**: Make sure `sanity.config.ts` has `basePath: "/studio"` configured
- Check that Sanity packages are installed: `npm install`

### Issue: No data showing in test page
- **Solution**: 
  1. Verify your Project ID is correct in `.env.local`
  2. Check that you've published content in Sanity Studio
  3. Verify the dataset name matches (production vs development)

### Issue: Images not displaying
- **Solution**: Use Sanity's image URL builder:
  ```typescript
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '@/sanity/client';
  
  const builder = imageUrlBuilder(client);
  const url = builder.image(heroImage).width(800).url();
  ```

## Next Steps

1. Create more content in Sanity Studio
2. Integrate CMS data into your Configurator component
3. Replace hardcoded models with data from Sanity
4. Add more schema types as needed

## Useful Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)

