import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base relativa: funciona en usuario.github.io/<repo>/ y en cualquier subcarpeta
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
