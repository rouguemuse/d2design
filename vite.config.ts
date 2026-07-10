import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        themes: resolve(__dirname, 'themes.html'),
        dark: resolve(__dirname, 'dark.html'),
        light: resolve(__dirname, 'light.html'),
        mixed: resolve(__dirname, 'mixed.html'),
        ddtv: resolve(__dirname, 'ddtv.html'),
        blog: resolve(__dirname, 'blog.html'),
        admin: resolve(__dirname, 'admin.html'),
      }
    }
  }
})
