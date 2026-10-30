import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site-config.mjs';

export const prerender = true;

// This is a one-page LP. Section fragments are not separate pages, and a
// generated build date would not be an accurate content modification date.
export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteConfig.url}</loc>\n  </url>\n</urlset>\n`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
