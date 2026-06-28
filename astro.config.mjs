import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
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

  integrations: [react()],

  vite: {
    plugins: [tailwindcss(), reloadOnTomlChange()],
    ssr: {
      noExternal: [
        "@babel",
        "@payloadcms/richtext-lexical",
        "babel-plugin-macros",
        "lucide-react",
        "radix-ui",
        "react-datepicker",
      ],
    },
    rollupInputOptions: {
      output: {
        manualChunks: {
          "react-datepicker": ["react-datepicker"],
        },
      },
    },
  },

  image: {
    domains: [import.meta.env.PUBLIC_API_URL || "http://localhost:3000"],
  },

  output: "server",
  adapter: vercel(),
});
