import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    port: 3001,  // Change this to any available port
    historyApiFallback: true, // Allow React Router to handle routes
  },
  plugins: [react()],
})
