import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://react-vert-theta.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    },
    watch: {
      usePolling: true,
    }
  },
  plugins: [react(), tailwindcss()],
})
