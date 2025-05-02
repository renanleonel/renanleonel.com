import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    tailwind(),
    mdx({
      optimize: true,
      imageService: true,
    }),
    react(),
  ],
  adapter: vercel({
    imageService: true,
  }),
});
