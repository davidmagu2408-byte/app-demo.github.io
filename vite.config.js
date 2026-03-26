import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            target: "https://client-demo-ecommerce.vercel.app",
            changeOrigin: true
        },
    }
})