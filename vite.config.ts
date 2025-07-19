import { defineConfig } from 'vite'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { reactRouter } from "@react-router/dev/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  base: process.env.NODE_ENV === 'development' ? '/' : '/lowcode-concept/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

