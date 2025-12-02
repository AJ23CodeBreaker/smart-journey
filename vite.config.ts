import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Robust Key Retrieval: Try loaded env first, fall back to process.env
  // This ensures Netlify's build environment variables are captured.
  const apiKey = env.API_KEY || process.env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Prevent crashes if process is accessed directly in client code
      'process.env': {},
      // Expose app version
      '__APP_VERSION__': JSON.stringify(packageJson.version),
      // Inject Netlify API Key into the browser using the loaded env
      '__API_KEY__': JSON.stringify(apiKey)
    }
  }
})