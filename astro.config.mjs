// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/data/site-config.mjs';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  output: 'static',
  trailingSlash: 'always',
});
