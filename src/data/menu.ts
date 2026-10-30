import type { ImageMetadata } from 'astro';

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/*.jpg', { eager: true });

export function photo(time: string): ImageMetadata {
  return photos[`../assets/line_oa_chat_261027_${time}.jpg`].default;
}

export interface Dish {
  id: string;
  name: string;
  image: ImageMetadata;
  price?: string;
  note?: string;
}

function dish(id: string, name: string, price?: string, note?: string): Dish {
  return { id, name, image: photo(id), price, note };
}

// 42 supplied food photographs. Prices reproduce the supplied à-la-carte
// sheets only when the dish can be matched; set/ambiguous photos omit prices.
export const menuGroups = [
  {
    id: 'rice-noodles', english: 'RICE, NOODLES & SOUP', name: 'ごはん・麺・スープ',
    dishes: [
      dish('153022', 'カオマンガイ', '950'),
      dish('152956', '海鮮パッキーマオ', '990'),
      dish('152957', 'フォー', '890'),
      dish('152958', 'トムカーガイ', '950'),
      dish('153003', 'チキングリーンカレーチャーハン', '900'),
      dish('153004', 'タイ風チャーハン', undefined, 'ごはんものの一皿'),
      dish('153005', 'エビチャーハン', '900'),
      dish('153006', 'チョウミン', '650'),
      dish('153007', 'ジャスミンライス', '300'),
      dish('153011', 'ナシゴレン', '900'),
    ],
  },
  {
    id: 'thai-curry', english: 'THAI CURRY', name: 'タイカレー',
    dishes: [
      dish('153010', 'グリーンカレー', '800', '鶏のグリーンカレー'),
      dish('153009', 'レッドカレー', '800', '海老のレッドカレー'),
    ],
  },
  {
    id: 'indian-curry', english: 'INDIAN CURRY', name: 'インドカレー',
    dishes: [
      dish('152945', 'チキンカレー', '850'),
      dish('152947', 'バターチキンカレー', '900'),
      dish('152944', 'マトンカレー', '900'),
      dish('152942', 'ほうれん草チキンカレー', '850'),
      dish('152943', 'ほうれん草マトンカレー', '880'),
    ],
  },
  {
    id: 'naan-sets', english: 'NAAN & SETS', name: 'ナン・セット',
    dishes: [
      dish('152948', 'プレーンナン', '250'),
      dish('152950', 'ナン', undefined, 'カレーとご一緒に'),
      dish('152951', 'チーズナン', '500'),
      dish('152952', 'バターナン', '500'),
      dish('152936', 'カレー・ナン・ライスのセット', undefined, 'セットの内容はメニュー表へ'),
      dish('152938', 'カレーとタンドリー料理のセット', undefined, 'セットの内容はメニュー表へ'),
      dish('152939', 'カレーとナンのセット', undefined, 'セットの内容はメニュー表へ'),
      dish('152940', 'ナンとカレーの組み合わせ', undefined, 'セットの内容はメニュー表へ'),
    ],
  },
  {
    id: 'grill', english: 'GRILL & STIR-FRY', name: 'グリル・炒めもの',
    dishes: [
      dish('152953', 'タンドリーチキン', '900', '4P／2P 500円'),
      dish('152954', 'シシカバブ', '1,000', '4P／2P 600円'),
      dish('153002', 'チキンティッカ', '800', '4P／2P 500円'),
      dish('153024', 'ガイサテ', '750', 'タイ風焼き鳥'),
      dish('152959', 'パックブン', '650', '空芯菜の炒めもの'),
    ],
  },
  {
    id: 'small-plates', english: 'SMALL PLATES & SALAD', name: '前菜・揚げもの・サラダ',
    dishes: [
      dish('153042', '生春巻き', '700', 'ポピアン'),
      dish('153041', 'ソムタム', '850', '青パパイヤのサラダ'),
      dish('153039', 'ヤムウンセン', '850', '春雨と海鮮のサラダ'),
      dish('153038', 'ヤムアボカド', '850', 'アボカドと海老のサラダ'),
      dish('153037', 'ヤムプラームックン', '790', '海老とイカのサラダ'),
      dish('153035', 'シーザーサラダ', '550'),
      dish('153034', 'アジアンスターサラダ', '700'),
      dish('153028', 'クンガディアム', '990', '海老のにんにくソース'),
      dish('153029', 'ガイガディアム', '750', 'タイ風鶏の唐揚げ'),
      dish('153033', 'コーン＆エビすり身揚げ', '790'),
      dish('153026', 'タイオムレツ［蟹］', '700'),
      dish('153000', 'モモ', '600', '蒸し餃子'),
    ],
  },
];

export const menuSheets = [
  { id: 'lunch', label: 'ランチ', english: 'LUNCH', image: photo('153044'), rotated: true },
  { id: 'dinner', label: 'ディナーセット', english: 'DINNER SET', image: photo('153043'), rotated: false },
  { id: 'rice-soup', label: 'ごはん・麺・スープ', english: 'RICE & NOODLES', image: photo('153100'), rotated: false },
  { id: 'thai-more', label: 'タイカレー・ごはん', english: 'THAI CURRY & RICE', image: photo('153058'), rotated: false },
  { id: 'curry', label: 'インドカレー', english: 'INDIAN CURRY', image: photos['../assets/edited_line_oa_chat_261027_153053_20261027_154521.jpg'].default, rotated: false },
  { id: 'naan', label: 'ナン', english: 'NAAN', image: photo('153052'), rotated: true },
  { id: 'sets', label: 'インディアンセット', english: 'INDIAN SET', image: photo('153049'), rotated: true },
  { id: 'grill', label: 'お肉・グリル', english: 'MEAT & GRILL', image: photo('153054'), rotated: false },
  { id: 'stir', label: '炒めもの', english: 'STIR-FRY', image: photo('153057'), rotated: false },
  { id: 'fried', label: '揚げもの', english: 'DEEP-FRIED', image: photo('153101'), rotated: false },
  { id: 'salad', label: 'サラダ・前菜', english: 'SALAD', image: photo('153102'), rotated: false },
];

export const popular = [
  { number: '01', name: 'ガパオライス', english: 'GAPAO RICE', description: 'バジルの香りと鶏肉の旨み。目玉焼きと一緒に味わう、タイのごはん。', price: '950', crop: '385 595 310 155' },
  { number: '02', name: 'パッタイ', english: 'PAD THAI', description: '小海老と米麺を炒めた、タイの焼きそば。ひと皿に広がる、タイの味。', price: '890', crop: '48 309 310 145' },
  { number: '04', name: 'トムヤムクンヌードル', english: 'TOM YUM NOODLES', description: 'トムヤムスープの辛みと酸味を、つるりとした米麺とともに。', price: '890', crop: '392 300 310 150' },
];
