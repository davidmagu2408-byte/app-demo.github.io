import { defineConfig,loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Tải các biến môi trường dựa trên chế độ hiện tại (development, production...)
  // process.cwd() giúp định vị thư mục gốc nơi chứa file .env
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          // Thay import.meta.env bằng env.VITE_API_URL
          target: env.VITE_API_URL, 
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
  }
})