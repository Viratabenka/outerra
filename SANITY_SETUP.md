# Sanity CMS Setup for Outerra

This project includes a Sanity schema for managing Outdoor Kitchen Models.

## Schema: Outdoor Kitchen Model

The `outdoorKitchenModel` schema includes the following fields:

### Required Fields
- **title** (string): The name of the outdoor kitchen model
- **slug** (slug): URL-friendly identifier (auto-generated from title)
- **description** (text): Detailed description (50-500 characters)
- **heroImage** (image): Main hero image with alt text
- **moduleTypes** (array): List of available module types
  - Each module has: name, description, icon
- **materialFinishes** (array): List of available material finishes
  - Each material has: name, description, color, image

### Optional Fields
- **price** (number): Starting price for the model
- **featured** (boolean): Mark as featured model
- **publishedAt** (datetime): Publication date

## Setup Instructions

1. **Create a Sanity Project**:
   - Go to [sanity.io](https://www.sanity.io)
   - Create a new project
   - Note your Project ID and Dataset name

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```

3. **Deploy Sanity Studio** (Optional):
   - Run `npx sanity deploy` to deploy the studio
   - Or access locally at `/studio` route

4. **Using the Schema**:
   - The schema is defined in `sanity/schemas/outdoorKitchenModel.ts`
   - Import the client from `sanity/client.ts` to query data
   - TypeScript types are available in `sanity/types/outdoorKitchenModel.ts`

## Example Query

```typescript
import { client } from "@/sanity/client";

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
```

## Module Types Examples
- Sink
- Grill
- Storage
- Prep Station
- Refrigeration
- Accessories

## Material Finishes Examples
- Stainless Steel
- Wood (various types)
- Stone
- Composite
- Powder Coated

