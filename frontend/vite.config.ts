import { defineConfig } from 'vite'
import { readFileSync } from 'fs';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This makes the server accessible outside the container
    https: {
      key: readFileSync('./localhost.key'),
      cert: readFileSync('./localhost.crt'),
    },
    watch: {
      usePolling: true,
      interval: 100
    },
    proxy: {
      // Proxy requests that start with '/api'
      '/api': {
        target: `http://${process.env.API_DOMAIN || 'localhost'}:3000`, // The address of your backend server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        // rewrite: (path: string) => path.replace(/^\/api/, ''), // Rewrites the path: '/api/users' becomes '/users' on the backend
      }
    }
  }
})
