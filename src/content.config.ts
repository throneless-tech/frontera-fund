import { parseTomlToJson } from "@/lib/utils/tomlUtils";
import { defineCollection, z } from "astro:content";
import { button, sectionsSchema } from "./sections.schema";
import { glob } from "astro/loaders";

const config = parseTomlToJson();
const blogFolder = config.settings.blogFolder || "blog";
const servicesFolder = config.settings.servicesFolder || "services";

// Universal Page Schema
export const page = z.object({
  title: z.string(),
  author: z.string().optional(),
  categories: z.array(z.string()).default(["others"]).optional(),
  tags: z.array(z.string()).default(["others"]).optional(),
  date: z.date().optional(), // example date format 2022-01-01 or 2022-01-01T00:00:00+00:00 (Year-Month-Day Hour:Minute:Second+Timezone)
  description: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().optional(),
  button: button.optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  robots: z.string().optional(),
  excludeFromSitemap: z.boolean().optional(),
  excludeFromCollection: z.boolean().optional(),
  customSlug: z.string().optional(),
  canonical: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  disableTagline: z.boolean().optional(),
  resources: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      logo: z.string().optional(),
      link: z.string(),
      id: z.string(),
    }),
  ).optional(),
  ...sectionsSchema,
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: page,
});

// Service collection schema
const serviceCollection = defineCollection({
  schema: page.merge(
    z.object({
      icon: z.string().optional(),
    }),
  ),
});

// Blog Collection
const blogCollection = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: page.merge(
    z.object({
      images: z.array(z.string()).min(1).optional(),
      options: z
        .object({
          layout: z.enum(["masonry", "grid", "full-width", "slider"]),
          appearance: z.enum(["dark", "light"]).optional(),
          limit: z.union([z.number().int(), z.literal(false)]).optional(),
        })
        .optional(),
      information: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        )
        .optional(),
    }),
  ),
});

// Export collections
export const collections = {
  // To prevent, getEntry (Content fetching API) throws error when collection does not exist, we specify a default collection along with the schema of each required collection
  [servicesFolder]: serviceCollection,
  services: serviceCollection,
  [blogFolder]: blogCollection,
  blog: blogCollection,

  pages: pagesCollection,
  sections: defineCollection({}),
  homepage: defineCollection({}),
};
