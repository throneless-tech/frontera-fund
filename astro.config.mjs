import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkParseContent from "./src/lib/utils/remarkParseContent.ts";
import {
  parseTomlToJson,
  reloadOnTomlChange,
} from "./src/lib/utils/tomlUtils.ts";
import vercel from "@astrojs/vercel";

const config = parseTomlToJson();

let {
  settings: {},
} = config;

// https://astro.build/config
export default defineConfig({
  site: config.site.baseUrl
    ? config.site.baseUrl
    : "https://fronterafundrgv.org",

  trailingSlash: config.site.trailingSlash ? "ignore" : "always",

  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      redirectToDefaultLocale: false,
      prefixDefaultLocale: false,
    },
  },

  integrations: [react(), mdx()],

  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      ],
    ],
    remarkPlugins: [remarkParseContent],

    // Code Highlighter https://github.com/shikijs/shiki
    shikiConfig: {
      theme: "light-plus", // https://shiki.style/themes
      wrap: false,
    },
    extendDefaultPlugins: true,
  },

  vite: {
    plugins: [tailwindcss(), reloadOnTomlChange()],
    ssr: {
      noExternal: ["react-hook-form" /*, 'other-lib-you-need'*/],
    },
  },

  image: {
    domains: [import.meta.env.PUBLIC_API_URL || "http://localhost:3000"],
  },

  output: "server",
  adapter: vercel(),
});