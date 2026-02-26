This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

tamableコーディング試験

以下の課題に取り組んでください。1ページ完結/ 選択式UI(ドロップダウン・トグ
ル等) で実装します。

〖課題〗
都市と指標を選択して、時系列の天気情報をチャート表示するSPA(Single Page
Application)を構築。
例)都市=「東京」、指標=「気温」、期間=「7日間」→ 折れ線グラフを描画
セレクトボックス/トグル/チェックボックス等の選択式のみで完結するUIに
する

〖ワイヤーフレーム〗

〖要件〗
1. データ取得

tamableコーディング試験 1

Open‐Meteo の Forecast API を使用し、緯度・経度と取得したい指標を指
定してJSONの時系列予報を取得する。APIキー不要で無料利用が可能(非
商用)。 (Open-Meteo)
都市はあらかじめ用意した候補(例:東京・大阪・札幌・福岡・那覇)から
選択できること。その都市に対応づけた lat/lon を内部で参照してAPIをコ
ールする。
2. 表示指標
hourly: temperature_2m (気温), apparent_temperature (体感温度), precipitation
(降水量), windspeed_10m (風速)
daily: temperature_2m_max / _min
forecast_days=7 までの日数、 timezone=auto 等の単位/タイムゾーンパラメータ
は適宜設定する。 (Open-Meteo)
3. 期間切り替え
48時間(hourly)/**7日間(daily or hourly集計)**をトグルで切り替え
可能にする。
4. チャート
折れ線(必要に応じスプライン)で描画。ツールチップ、凡例、Y軸単位、
X軸(時刻/日付)フォーマットを実装。
5. UX要件
ローディング中はプレースホルダ/スピナーを表示。
エラー時(ネットワーク、パラメータ不正、レート制限等)は復帰手段を伴
うメッセージを表示。
※Open‐Meteo の無償利用規約では非商用で日1万/時5千/分600リクエス

トの目安。過剰アクセスを避ける(デバウンス/キャッシュ)。 (Open-
Meteo)

6. アクセシビリティ
セレクト・トグルに適切なlabel、モーダル使用時のフォーカストラップ
等、基本を遵守。
7. パフォーマンス
選択変更時のみフェッチし、重い再描画を避ける(メモ化、SWR/React
Query等のキャッシュは任意)。

tamableコーディング試験 2

8. 任意の拡張
指標を複数選択→多系列重ね描き
°C/°F ・風速単位の切替
直近選択の保持(localStorage)
これ以外にもオリジナリティがある実装を含めてもらっても問題ありませ
ん。

〖制約〗
フレームワーク:React または Next.js(最新版を推奨、TypeScript 推奨)
ページ構成:1ページで完結。モーダル/タブ/アコーディオン等のページ内変
化は可。
データソース:Open‐Meteo の Forecast API(必要に応じ Geocoding API)。
APIキー不要/非商用の無償利用可。 (Open-Meteo)
チャート:任意ライブラリ(Recharts / Chart.js など)自由に選定してもらっ
て問題ありません。
ブラウザ:Google Chrome 最新版で正しく動作すること。

〖提出〗
リポジトリURL(GitHub など)
README
(起動手順/技術選定理由/ディレクトリ構成/工夫点/既知の制約)
デモURL(任意:Vercel 等。Basic認証等の認証をかけることを推奨)

〖実装のポイント(採点観点)〗
1. 設計
コンポーネント分割・責務分離、状態設計、データフローの明快さ
2. コーディング
セマンティックなコーディング、非同期/エラー処理、ローディング・空状
態の網羅、型安全性(TypeScript推奨)、リンター・フォーマッターの適切な
設定・利用

tamableコーディング試験 3

3. 技術選定
チャート・データ取得・日付処理等のライブラリ選定理由と使いこなし
4. UI/UX
操作性(切替の即時性、ツールチップ等)、視認性、レスポンシブ
5. パフォーマンス
無駄な再フェッチ/再描画の抑制、キャッシュやメモ化の適用

〖注意事項〗
Open‐Meteo は非商用の無料APIとして APIキー不要で利用可能ですが、レート
制限(目安)と表記(帰属表示)に関するポリシーを遵守してください。選考
用の個人開発は通常非商用に該当します。商用的に公開・運用する場合はプラ
ン/利用条件を確認してください。 (Open-Meteo)