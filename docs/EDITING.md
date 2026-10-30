# アジアンスター 編集ガイド

## 今回の実装

2026-10-30、制作計画に沿って日本語のAstro LPを実装。ユーザーの「実装後の確認は自分で行うので不要」という指示に従い、ビルド、型チェック、ブラウザ、レスポンシブ表示、リンク、アニメーションの実機確認は実行していない。開発サーバー起動・デプロイも行っていない。

## 編集箇所

| 変更内容 | ファイル |
| --- | --- |
| 店舗情報・電話・地図・SEO説明文 | `src/data/site.ts` |
| 料理42枚の名前・価格・カテゴリ、メニュー表の一覧 | `src/data/menu.ts` |
| ページ構成・head内のメタ情報 | `src/pages/index.astro` |
| ヒーローと生成画像の切り替え | `src/components/Hero.astro` |
| 人気5品・紹介文 | `src/components/Signature.astro` |
| タイ料理・インド料理の紹介 | `src/components/Cuisine.astro` |
| 写真一覧・メニュー表の拡大ビュー | `src/components/MenuSection.astro` |
| 利用シーン | `src/components/About.astro` |
| 店舗情報の表示 | `src/components/Access.astro` |
| PC・スマートフォンのナビゲーション | `src/components/Header.astro`、`src/components/Footer.astro` |
| 色・レイアウト・レスポンシブ | `src/styles/global.css` |
| GSAP・Lenis・ナビ開閉・メニュー拡大の動作 | `src/scripts/site.ts` |

## 提供素材について

料理写真42枚をすべてカテゴリ別の一覧に配置。一部は人気料理や料理紹介でも使っている。カテゴリは開閉式で、最初の「ごはん・麺・スープ」を初期表示している。

メニュー表17枚には完全重複3組と、同じページの別撮影・分割写真が含まれる。内容が重なるものをまとめ、11項目の閲覧リンクを用意した。原本ファイルは削除していない。JavaScriptが利用できない場合もリンクから元画像を開ける。

横向きのメニュー表は、拡大ビューのCSSで90度回転して表示する。元画像そのものは変更していない。

ガパオ・パッタイ・トムヤムクンヌードルの人気料理写真は `153100.jpg` の該当部分をSVGの表示範囲で見せている。画像ファイルの切り出し・生成置換はしていない。単体写真が追加された場合は `Signature.astro` の該当表示をAstroの `Image` に置き換えると、大きな写真を使いやすい。

店舗カード1枚はポイント制度の現行条件が不明なため、販促情報として掲載していない。

## 価格と営業時間

価格は提供メニュー表から読み取った値。税込・税別を確定する根拠がないため、サイト上で「税込」と断定していない。単品の判別ができる料理だけ一覧に価格を記載し、セット写真や曖昧なナンなどには価格を付けていない。

人気5品は単品区分。ガパオ950円、パッタイ890円、カオマンガイ950円、トムヤムクンヌードル890円、バターチキンカレー900円。ランチ・ディナーセットとは分けて扱う。

メニュー表には23:30までという記載があるが、営業時間はユーザー指定の11:00〜23:00を全日共通で採用。メニュー表の閲覧箇所に、営業時間が原本表記と異なる場合がある旨を記載している。

## 生成ヒーロー

- PC用：`src/assets/generated/asian-star-hero-desktop-v1.png`
- スマートフォン用：`src/assets/generated/asian-star-hero-mobile-v1.png`
- 生成方法・プロンプト：`docs/hero-image-brief.md`

AstroでWebPに変換し、画面幅640px以下では縦長画像に切り替える。実店舗写真ではなくイメージビジュアルとして扱い、ヒーローに注記を表示している。Restaurant構造化データの店舗写真には登録していない。

## アニメーション

PCの細かいポインター操作環境ではLenisをGSAPのtickerに同期。スマートフォンではネイティブスクロールを使う。写真や見出しの表示はGSAP・ScrollTriggerで制御し、一部の写真だけ軽いパララックスを加える。

「動きを減らす」設定ではアニメーションと慣性スクロールを停止する。HTMLは初期状態で内容が見えるようにしてあり、CSSで全体を非表示にしてからJavaScriptの起動を待つ構成にはしていない。

## ローカルで開くとき

プロジェクトのAGENTS.mdに従い、開発サーバーはバックグラウンド起動する。

```powershell
npm run dev -- --background
```

管理コマンドは次のとおり。

```powershell
npm exec astro dev status
npm exec astro dev logs
npm exec astro dev stop
```

## 公開URLが決まったら

`astro.config.mjs` の `site` に正式なURLを設定すると、ページのcanonical・og:urlが出力される。現段階では不明な公開URLを仮定していない。サイトマップ・公開・Search Consoleへの登録は今回の実装範囲に含めていない。

外部フォントはGoogle Fonts、地図はGoogle Mapsの埋め込みを使用している。
