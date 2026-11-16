import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages のプロジェクトページ(https://<user>.github.io/task-board/)用
export default defineConfig({
  base: '/task-board/',
  plugins: [react()],
})
