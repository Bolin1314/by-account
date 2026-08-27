# by-account

公開 repo：by_account 前端 SPA + PWA。後端在私有 GitLab repo `by-account-private`。

## 部署

push 到 GitHub repo `by-account`（main 分支）→ GitHub Pages（Source = main / root）自動更新。

**注意**：改動 `index.html` 後要同時調高 `service-worker.js` 的 `CACHE` 版本號，否則使用者裝置會續用舊快取。

## 檔案

- `index.html` — 全部 UI 與邏輯（Vanilla JS + Tailwind CDN，單檔 SPA）
- `manifest.webmanifest` — PWA manifest
- `service-worker.js` — PWA L1 快取
- `icons/` — App icon 與浣熊插畫

## 技術

- 前端：純 HTML/CSS/JS，Tailwind CDN，無 build step
- 後端：Cloudflare Worker（`WEB_APP_URL` 常數；POST JSON-as-text/plain 避開 CORS preflight）
- 資料庫：Cloudflare D1
- 認證：帳號 + 密碼，session token 存 localStorage（記住我 30 天，否則 4 小時）；忘記密碼走 email 驗證碼
- PWA：L1 基礎（可裝桌面、靜態檔離線快取）；不做離線寫入

## 給未來的我（debug）

- session 失效會自動 clearAuth + 跳 login
- API 失敗 toast 紅色顯示後端 error code（`friendlyErr` 有中文對照表）
- 帳本資料先存 localStorage，但每次切換重新 fetch
- 2026-08 已從 Apps Script 切到 Cloudflare Worker；載入時會自動清掉舊裝置殘留的 Apps Script 網址設定
- 設定頁「變更連線」可臨時覆寫 API 網址（緊急用）
