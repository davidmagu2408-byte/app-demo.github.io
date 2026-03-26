import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            //target: "http://localhost:3000",
            //"https://client-demo-ecommerce.vercel.app"
            //changeOrigin: true
        },
    }
})