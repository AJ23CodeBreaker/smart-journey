import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Prevent crashes if process is accessed directly
      'process.env': {},
      // Expose app version
      '__APP_VERSION__': JSON.stringify(packageJson.version),
      // Inject Netlify API Key into the browser using the loaded env
      '__API_KEY__': JSON.stringify(env.API_KEY || '')
    }
  }
})