import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
base: '/Ednut-Ticket-React/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
