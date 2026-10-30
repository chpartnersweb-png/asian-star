import { absoluteUrl, siteConfig } from './site-config.mjs';

const address = '東京都中野区中野5-59-6 ハタノビル2F';
const mapQuery = encodeURIComponent(`アジアンスター ${address}`);

export const site = {
  name: 'アジアンスター',
  englishName: 'ASIAN STAR',
  url: siteConfig.url,
  title: 'アジアンスター｜中野駅徒歩1分のタイ料理・インド料理店',
  description: '中野駅から徒歩1分のタイ料理・インド料理店「アジアンスター」。ガパオライス、パッタイ、カオマンガイ、カレーなどを楽しめます。毎日11:00〜23:00・年中無休、24席。東京都中野区中野5-59-6 ハタノビル2F。',
  phone: '03-5942-4749',
  phoneHref: 'tel:0359424749',
  postalCode: '164-0001',
  address,
  access: '中野駅から徒歩1分',
  hours: '11:00–23:00',
  closed: 'なし',
  seats: '24席',
  payment: 'カード・QR決済対応',
  mapHref: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  mapEmbed: `https://maps.google.com/maps?q=${mapQuery}&output=embed&hl=ja&z=17`,
};

export const navigation = [
  { href: '#signature', label: '人気の料理', english: 'SIGNATURE' },
  { href: '#cuisine', label: 'タイとインド', english: 'OUR CUISINE' },
  { href: '#menu', label: 'メニュー', english: 'MENU' },
  { href: '#access', label: '店舗・アクセス', english: 'ACCESS' },
];

export const restaurantSchema = {
  '@type': 'Restaurant',
  '@id': absoluteUrl('/#restaurant'),
  name: site.name,
  alternateName: 'Asian star',
  url: site.url,
  description: site.description,
  mainEntityOfPage: { '@id': absoluteUrl('/#webpage') },
  hasMenu: absoluteUrl('/#menu'),
  telephone: '+81-3-5942-4749',
  servesCuisine: ['Thai', 'Indian'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '中野5-59-6 ハタノビル2F',
    addressLocality: '中野区',
    addressRegion: '東京都',
    postalCode: site.postalCode,
    addressCountry: 'JP',
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => `https://schema.org/${day}`),
    opens: '11:00',
    closes: '23:00',
  }],
  hasMap: site.mapHref,
};
