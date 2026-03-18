// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: 'Lora',
      cssVariable: '--font-lora',
      provider: fontProviders.fontsource(),
    },
  ],

  integrations: [
    AstroPWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts', // This is where your logic will live
      injectManifest: {
        // Use injectManifest instead of workbox
        globIgnores: [
          '**/node_modules/**/*',
          '**/astro/**/*',
          '**/astro:server-app',
        ],
      },
      registerType: 'autoUpdate',
      injectRegister: 'inline', // Automatically adds the registration script to your HTML
      manifest: {
        name: 'HumanSearch',
        short_name: 'HumanSearch',
        theme_color: '#000000',
        icons: [], // Add your icons here later
      },
      devOptions: {
        enabled: true, // Allows you to test the redirector in dev mode
        type: 'module',
        navigateFallbackAllowlist: [/^\/$/],
      },
    }),
  ],
})
