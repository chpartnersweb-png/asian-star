// One production URL for Astro, metadata, structured data and crawl endpoints.
export const siteConfig = {
  url: 'https://asian-star.pages.dev/',
  language: 'ja',
  locale: 'ja_JP',
};

/** @param {string} [path] */
export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).href;
}
