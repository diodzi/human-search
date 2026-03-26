// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'

import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  output: 'server',
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
      outDir: 'dist/client',
      filename: 'sw.ts',
      injectManifest: {
        globIgnores: [
          '**/node_modules/**/*',
          '**/astro/**/*',
          '**/astro:server-app',
        ],
        globDirectory: 'dist/client',
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        name: 'HumanSearch',
        short_name: 'HumanSearch',
        theme_color: '#000000',
        icons: [],
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallbackAllowlist: [/^\/$/],
      },
    }),
  ],

  adapter: cloudflare(),
})
