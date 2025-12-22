import { defineField, defineType } from "sanity";

export default defineType({
  name: "outdoorKitchenModel",
  title: "Outdoor Kitchen Model",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
      description: "The name of the outdoor kitchen model",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly identifier for this model",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(50).max(500),
      description: "Detailed description of the outdoor kitchen model",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the image",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Main hero image for the outdoor kitchen model",
    }),
    defineField({
      name: "moduleTypes",
      title: "Available Module Types",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Module Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Module Description",
              type: "text",
            },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon identifier or name",
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "description",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
      description: "List of available module types (e.g., sink, grill, storage)",
    }),
    defineField({
      name: "materialFinishes",
      title: "Material Finishes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Material Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Material Description",
              type: "text",
            },
            {
              name: "color",
              title: "Color",
              type: "string",
              description: "Color code or name (e.g., #FFFFFF, Stainless Steel)",
            },
            {
              name: "image",
              title: "Material Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
      description: "List of available material finishes (e.g., stainless steel, wood)",
    }),
    defineField({
      name: "price",
      title: "Starting Price",
      type: "number",
      description: "Starting price for this model (optional)",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Mark this model as featured",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "Publication date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "heroImage",
    },
  },
  orderings: [
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Title Z-A",
      name: "titleDesc",
      by: [{ field: "title", direction: "desc" }],
    },
    {
      title: "Published Date",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

