// ARQUIVO: sw.js (Na pasta raiz do projeto)

const CACHE_NAME = 'vibe-oio-v2'; // Mudei para v2 para forçar a atualização no celular do usuário
const urlsToCache = [
  './',
  'index.html',
  'css/style.css',
  'css/theme.css',
  'js/main.js',
  'js/chat.js',
  'js/perfil.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
