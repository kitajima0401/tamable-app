# tamable-app

日本主要都市の天気予報ダッシュボード  
Open-Meteo APIを使って、48時間または7日間の気象データをインタラクティブな折れ線グラフで確認できます。

## 起動手順

```bash
# リポジトリをクローン
git clone https://github.com/あなたのユーザー名/tamable-app.git
cd tamable-app

# 依存インストール
npm install

# 開発サーバー起動
npm run dev

# 技術選定理由
Next.js 16 (App Router)
→ 最新のServer Components対応、vercelとの相性がよい
TypeScript
→ 型安全でAPIレスポンスの扱いや状態管理
Tailwind CSS v4
→ 高速開発・一貫したダークテーマUI。
TanStack Query (React Query)
→ データフェッチのキャッシュ・再試行・staleTime管理に使用。無駄なAPIリクエストを大幅削減。
Recharts
→ カスタムTooltip・凡例などを設計、軽量に使用

# ディレクトリ構成
tamable-app/
├── app/
│   ├── components/               # Client Component（UIパーツ）
│   │   ├── CitySelector.tsx
│   │   ├── MetricSelector.tsx
│   │   ├── PeriodToggle.tsx
│   │   ├── UnitToggle.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── WeatherChart.tsx
│   │   └── QueryProvider.tsx
│   ├── lib/
│   │   └── weather.ts            
│   ├── globals.css
│   ├── layout.tsx                
│   └── page.tsx                  
├── public/                       
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── README.md

# 工夫点
ダークテーマ統一（グラデーション背景 + backdrop-blur + cyanアクセント）
カスタムTooltipで日時・値・単位をわかりやすく表示
期間切替時にメトリクスを自動調整（daily時はtemperature_2m → max/min、precipitation → sum など）
単位切替（metric/imperial）をOpen-Meteoのクエリパラメータで正しく対応
localStorageで全設定を永続化 → リロードしても選択状態を保持
TanStack Queryで5分キャッシュ + retry無効 → 快適なUXとAPI負荷軽減
ResponsiveContainer + max-w-4xl で基本的なスマホ対応

# 既知の制約
都市は5つ固定（東京・大阪・札幌・福岡・那覇）
データ永続化はブラウザlocalStorageのみ
エラー処理（メッセージ＋再試行ボタン）
チャート高さ固定（h-96）

