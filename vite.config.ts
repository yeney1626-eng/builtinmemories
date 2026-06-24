import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Use our hand-crafted sw.js in public/ instead of auto-generating one
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      injectManifest: {
        injectionPoint: undefined, // we handle caching ourselves
      },
      manifest: false, // we have our own manifest.json in public/
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
})
