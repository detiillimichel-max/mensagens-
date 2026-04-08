// ARQUIVO: sw.js (Na pasta raiz do projeto)

const CACHE_NAME = 'vibe-oio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/theme.css',
  '/js/script.js',
  '/js/nav.js'
];

// Instala o Service Worker e salva os arquivos principais no celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta as requisições para o app funcionar mais rápido e liberar a instalação
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
