import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',     // Allow connections from all hosts
    port: 5000,          // Use port 5000 for frontend (required by Replit)
    strictPort: true,    // Fail if port is already in use
    allowedHosts: true,  // Allow all hosts (required for Replit)
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
