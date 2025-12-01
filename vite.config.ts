import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This is critical for the AI Key to work in the browser/preview
    'process.env': process.env,
    // Expose app version from package.json
    '__APP_VERSION__': JSON.stringify(packageJson.version)
  }
})