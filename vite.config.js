import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 独自ドメイン(tasks.equine-vet-tsuchiya.com)のルートで公開するため base は '/'
export default defineConfig({
  plugins: [react()],
})
