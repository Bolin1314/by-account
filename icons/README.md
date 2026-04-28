# icons

目前只放一個 SVG（`favicon.svg`），現代瀏覽器/Chrome/Edge PWA 安裝可用。

## 想要更完整的 iOS / 舊瀏覽器支援

iOS Safari 需要 PNG 格式的 `apple-touch-icon`，PWA install icon 在某些瀏覽器也偏好 PNG。
要補可用以下任一工具用 `favicon.svg` 產出：

- https://favicon.io/favicon-converter/
- https://realfavicongenerator.net/
- 本機：`magick favicon.svg -resize 192x192 icon-192.png`（需安裝 ImageMagick）

放入後再把 `manifest.webmanifest` 的 `icons` 與 `index.html` 的 `apple-touch-icon` 補回。
