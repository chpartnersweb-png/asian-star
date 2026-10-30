# アジアンスター SEO設定

更新日：2026-10-30

## 正式な公開URL

`https://asian-star.pages.dev/`

公開URLは `src/data/site-config.mjs` で共通管理。Astro設定、canonical、OGP、構造化データ、サイトマップ、robots.txtがこの値を参照する。ドメインを変更する場合はこのファイルを変更する。

## 実装した内容

### 検索結果向けのメタ情報

- タイトル：アジアンスター｜中野駅徒歩1分のタイ料理・インド料理店
- 説明文：中野駅から徒歩1分のタイ料理・インド料理店「アジアンスター」。ガパオライス、パッタイ、カオマンガイ、カレーなどを楽しめます。毎日11:00〜23:00・年中無休、24席。東京都中野区中野5-59-6 ハタノビル2F。
- canonical：`https://asian-star.pages.dev/`
- robotsメタ：`index, follow, max-image-preview:large`
- 日本語の文書言語：`ja`

店名、駅名、料理ジャンル、営業時間、所在地には提供済み情報を使っている。キーワードの羅列や、実在しない口コミ・評価は追加していない。

### SNS共有

OGPとTwitter/Xの大きな画像カード用メタ情報を追加。タイトル・説明・URLを検索用メタ情報と共通化し、画像URLは正式ドメインの絶対URLにする。

共有画像は `src/assets/line_oa_chat_261027_152936.jpg` の料理写真をJPEGとして出力する。インド料理紹介にも掲載しているカレー・ナン・ライスのセット写真で、生成ヒーローを実店舗の記録写真として扱わない。

### 構造化データ

JSON-LDの `@graph` で次の情報を関連付ける。

- `Restaurant`：店名・URL・所在地・電話・料理ジャンル・全日の営業時間・メニューページ内の位置・地図
- `WebSite`：サイト名・正式URL・日本語・運営店舗との関係
- `WebPage`：ページ名・説明文・正式URL・店舗とサイトとの関係
- `ImageObject`：提供された料理写真のURL・寸法・説明

各エンティティは正式URLに基づく `@id` で参照する。営業時間は全日11:00〜23:00。未確認の緯度経度、予約可否、口コミ、星評価、価格帯、税込かどうかを構造化データに追加していない。

### クローラー向けファイル

- `src/pages/robots.txt.ts` → `/robots.txt`
- `src/pages/sitemap.xml.ts` → `/sitemap.xml`

両方を静的エンドポイントとしてビルド時に出力する。robots.txtには巡回を許可する指定とサイトマップURLを記載。1ページ構成のため、サイトマップは正式なトップページURLのみ。セクションのアンカー、画像URL、メニュー原本を独立したページとして列挙しない。実際のコンテンツ更新日時を自動判定していないため、ビルド日を `lastmod` として出力しない。

## 主な編集箇所

| 項目 | ファイル |
| --- | --- |
| 公開URL・言語 | `src/data/site-config.mjs` |
| タイトル・説明文・店舗の事実情報 | `src/data/site.ts` |
| 構造化データの関係 | `src/data/seo.ts` |
| head内のSEOタグ・共有画像 | `src/components/Seo.astro` |
| Astroの公開URL・静的出力設定 | `astro.config.mjs` |
| robots.txt | `src/pages/robots.txt.ts` |
| サイトマップ | `src/pages/sitemap.xml.ts` |

## 反映とSearch Console

ローカルソースへの実装であり、変更を含めたデプロイが必要。

デプロイ後の対象URL：

- ページ：`https://asian-star.pages.dev/`
- robots：`https://asian-star.pages.dev/robots.txt`
- サイトマップ：`https://asian-star.pages.dev/sitemap.xml`

Google Search Consoleでこのサイトの所有権を確認したうえで、サイトマップに `https://asian-star.pages.dev/sitemap.xml` を送信する。必要に応じてトップページのURL検査からインデックス登録をリクエストする。登録・検索結果への反映はGoogle側の判断であり、今回のソース実装によって完了したとは扱わない。

## 今回の作業状況

ユーザー指示により、実装後のビルド・型チェック・ブラウザ表示・生成HTML/XML・構造化データのテストは実行していない。デプロイ・Search Console操作も実行していない。

作業前に公開URLの取得を試みたが、この環境のWeb取得ツールでは取得できなかった。公開済みページのHTTP状態、現在のSEOタグ、インデックス状況は確認できていない。

## 参照資料

- Astroコンポーネント：https://docs.astro.build/en/basics/astro-components/
- Astro静的エンドポイント：https://docs.astro.build/en/guides/endpoints/
- Google ローカルビジネス構造化データ：https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google canonical：https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google サイトマップ：https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
