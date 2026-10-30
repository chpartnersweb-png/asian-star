import { absoluteUrl, siteConfig } from './site-config.mjs';
import { site, restaurantSchema } from './site';

interface SeoImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export function structuredData(image: SeoImage) {
  const restaurantId = absoluteUrl('/#restaurant');
  const websiteId = absoluteUrl('/#website');
  const webpageId = absoluteUrl('/#webpage');
  const imageId = absoluteUrl('/#primaryimage');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...restaurantSchema,
        image: { '@id': imageId },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: site.url,
        name: site.name,
        alternateName: 'Asian Star',
        inLanguage: siteConfig.language,
        publisher: { '@id': restaurantId },
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: siteConfig.language,
        isPartOf: { '@id': websiteId },
        about: { '@id': restaurantId },
        mainEntity: { '@id': restaurantId },
        primaryImageOfPage: { '@id': imageId },
      },
      {
        '@type': 'ImageObject',
        '@id': imageId,
        url: image.url,
        contentUrl: image.url,
        width: image.width,
        height: image.height,
        caption: image.alt,
      },
    ],
  };
}
