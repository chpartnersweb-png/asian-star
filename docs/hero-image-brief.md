# ヒーロー画像の生成記録

作成日：2026-10-30

生成は組み込みの image_gen ツールを使用。API/CLIは使用していない。

用途はタイ料理・インド料理の食卓を表現する雰囲気用ビジュアル。実店舗・実提供料理の記録写真ではない。メニュー写真・店舗写真・Restaurant構造化データの画像としては使わない。

## PC用

保存先：`src/assets/generated/asian-star-hero-desktop-v1.png`

最終生成プロンプト：

> Use case: photorealistic-natural. Asset type: full-bleed website hero photograph for Asian Star, a Thai and Indian restaurant in Nakano, Japan. Generate a refined, inviting editorial food photograph, landscape 16:9 composition, preferably 2400px or larger wide. A real-looking dark walnut tabletop seen from a 40-degree overhead angle, a generous Thai and Indian feast arranged around the OUTER EDGES and LOWER THIRD: an off-white ceramic plate of basil minced chicken rice with a fried egg at lower left, a small metal bowl of rich orange Indian butter chicken curry and beautifully blistered naan at lower right, a Thai rice noodle bowl with prawns and lime on upper right, fresh herbs and a subtle folded warm linen napkin. Cropped dishes at edges create intimacy. Keep the CENTRAL THIRD AND UPPER CENTRAL AREA open, uncluttered, deep dark brown natural tabletop for overlaying centered ivory typography later in code. Food must be appetizing, naturally proportioned, vividly but naturally colored and sharply detailed, ceramic and metal utensils tasteful and everyday, sophisticated casual dining rather than luxury props. Warm directional evening light, subtle highlights, gentle shadows, tactile grain, authentic food texture, extremely high quality natural photography. The image must be bright enough to see the dishes without crushing the shadows. No text, lettering, logo, stars, graphics, watermark, people, hands, dining room or architecture. The image is an atmospheric illustration, not a documentary photograph of the business. Single continuous photograph, no collage, no panels, no frames.

## スマートフォン用

保存先：`src/assets/generated/asian-star-hero-mobile-v1.png`

最終生成プロンプト：

> Use case: photorealistic-natural. Asset type: MOBILE portrait full-bleed website hero for Asian Star Thai & Indian restaurant in Nakano. A single natural editorial food photograph in 9:16 vertical portrait, dark warm walnut dining table seen at 45-degree overhead angle, warmly lit and tactile. Keep the upper half and center of the image mostly clear, deep brown tabletop for centered ivory website typography to be added in HTML. Arrange inviting dishes around the lower third and edges: beautifully blistered naan and an orange butter chicken curry in a small metal bowl at lower right, a cropped off-white plate of Thai minced chicken basil rice with golden fried egg at lower left, a little lime and green herbs at top right edge, subtle linen. Emphasize mouthwatering real textures and natural food proportions, sophisticated yet approachable dining. The dishes must be fully recognizable within the portrait image and not hidden in deep shadows. Fine natural grain and gentle highlights. No words, text, logo, watermark, frames, split panels, people, hands, restaurant interior. This is an atmospheric food image, not a documentary photo of the real business. Prefer 1024x1792 or similar portrait.

## サイトでの表示

`src/components/Hero.astro` でWebPへ変換し、picture要素でPC・スマートフォン用を切り替える。店名やコピーは画像には含めず、HTMLで重ねている。
