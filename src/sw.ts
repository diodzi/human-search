import { resolveBang } from './utils/redirector'

declare const self: ServiceWorkerGlobalScope

import { precacheAndRoute } from 'workbox-precaching'
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  console.log('SW seeing request to:', url.pathname, url.search)

  if (url.pathname === '/' && url.searchParams.has('search')) {
    console.log('Target params detected!')

    const redirectUrl = resolveBang(event.request.url)
    console.log('Resolved to:', redirectUrl)

    if (redirectUrl) {
      event.respondWith(
        new Response(null, {
          status: 302,
          headers: { Location: redirectUrl },
        }),
      )
      return
    }
  }

  event.respondWith(fetch(event.request))
})

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) =>
  event.waitUntil(self.clients.claim()),
)
