import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/home',
  plugins: [react()],
  build: {
    sourcemap: false,
    outDir: 'build'
  }
})
