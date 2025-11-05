import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react-swc' // Respetamos tu plugin swc

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Mantenemos tu puerto 3000
        
        hmr: {
            clientPort: 443
        },
        headers: {
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net"
        }
    },
    build: { 
        outDir: 'dist',
    }
})