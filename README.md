# by-account

公開 repo：by_account 前端 SPA + PWA。後端在私有 GitLab repo `by-account-private`。

## 部署

push 到 GitHub repo `by-account`（main 分支）→ 開 GitHub Pages（Source = main / root）。

開啟網站 → 第一次會問 Apps Script Web App URL → 填入後存於 localStorage → 自動跳登入頁。

完整部署流程：見私有 repo 的 `SETUP_GUIDE.md`。

## 檔案

- `index.html` — 全部 UI 與邏輯（Vanilla JS + Tailwind CDN，單檔 SPA）
- `manifest.webmanifest` — PWA manifest
- `service-worker.js` — PWA L1 快取
- `icons/` — App icon（目前僅 SVG）

## 技術

- 前端：純 HTML/CSS/JS，Tailwind CDN，無 build step
- 後端：Google Apps Script Web App（POST JSON-as-text/plain 避開 CORS preflight）
- 認證：帳號 + 密碼，session token 存 localStorage（記住我 30 天，否則 4 小時）
- PWA：L1 基礎（可裝桌面、靜態檔離線快取）；不做離線寫入

## 給未來的我（debug）

- session 失效會自動 clearAuth + 跳 login
- API 失敗 toast 紅色顯示後端 error code
- 帳本資料先存 localStorage，但每次切換重新 fetch
