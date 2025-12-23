import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";

// Enable ISR (Incremental Static Regeneration)
// Page will revalidate every 60 seconds, or on-demand via webhook
export const revalidate = 60; // Revalidate every 60 seconds

export default async function TestCMSPage() {
  let models: any[] = [];
  let error: string | null = null;

  try {
    models = await client.fetch(`
      *[_type == "outdoorKitchenModel"] | order(publishedAt desc) {
        _id,
        title,
        description,
        heroImage,
        moduleTypes,
        materialFinishes,
        price,
        featured,
        publishedAt
      }
    `);
  } catch (e: any) {
    error = e.message || "Failed to fetch data from Sanity";
    console.error("Sanity fetch error:", e);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            CMS Test Page
          </h1>
          <p className="text-gray-600 mb-4">
            This page displays all Outdoor Kitchen Models from Sanity CMS
          </p>
          <a
            href="/studio"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold"
          >
            Open Sanity Studio →
          </a>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-4">
              Make sure you have:
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>Created a Sanity project</li>
                <li>Set up .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID</li>
                <li>Created and published at least one Outdoor Kitchen Model</li>
              </ul>
            </p>
          </div>
        )}

        {models.length === 0 && !error && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-yellow-800 mb-2">
              No Content Found
            </h2>
            <p className="text-yellow-600">
              No Outdoor Kitchen Models found in Sanity. Create your first model in{" "}
              <a href="/studio" className="underline font-semibold">
                Sanity Studio
              </a>
              .
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <div
              key={model._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-200"
            >
              {/* Hero Image */}
              {model.heroImage && (
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={urlFor(model.heroImage).width(800).url()}
                    alt={model.heroImage.alt || model.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Title and Featured Badge */}
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    {model.title}
                  </h2>
                  {model.featured && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {model.description}
                </p>

                {/* Price */}
                {model.price && (
                  <p className="text-2xl font-bold text-primary-600 mb-4">
                    ${model.price.toLocaleString()}
                  </p>
                )}

                {/* Module Types */}
                {model.moduleTypes && model.moduleTypes.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Modules ({model.moduleTypes.length})
                    </h3>
                    <ul className="space-y-1">
                      {model.moduleTypes.slice(0, 3).map((module: any, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600">
                          • {module.name}
                        </li>
                      ))}
                      {model.moduleTypes.length > 3 && (
                        <li className="text-sm text-gray-400">
                          +{model.moduleTypes.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Material Finishes */}
                {model.materialFinishes && model.materialFinishes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Materials ({model.materialFinishes.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {model.materialFinishes.slice(0, 3).map((material: any, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {material.name}
                        </span>
                      ))}
                      {model.materialFinishes.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                          +{model.materialFinishes.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Published Date */}
                {model.publishedAt && (
                  <p className="text-xs text-gray-400 mt-4">
                    Published: {new Date(model.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Debug Info */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Debug Information</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Total Models:</span> {models.length}
            </p>
            <p>
              <span className="font-semibold">Project ID:</span>{" "}
              {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "Not set"}
            </p>
            <p>
              <span className="font-semibold">Dataset:</span>{" "}
              {process.env.NEXT_PUBLIC_SANITY_DATASET || "Not set"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

