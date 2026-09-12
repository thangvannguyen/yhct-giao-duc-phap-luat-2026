import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages phục vụ repo này ở thư mục con:
  // https://thangvannguyen.github.io/yhct-giao-duc-phap-luat-2026/
  // Bản dev vẫn chạy ở '/' cho tiện.
  base: command === 'build' ? '/yhct-giao-duc-phap-luat-2026/' : '/',
  plugins: [react(), tailwindcss()],
}))
