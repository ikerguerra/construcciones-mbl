import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeTableCards from './src/lib/rehypeTableCards.mjs';

export default defineConfig({
  site: 'https://construccionesmbl.com',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [rehypeTableCards],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/mensaje-enviado/') && !page.includes('/404'),
    }),
  ],
});
