// AudioSplit Local - Service Worker
// Versão 1.0.0

const CACHE_NAME = 'audiosplit-local-v1.0.0';
const STATIC_CACHE_NAME = 'audiosplit-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'audiosplit-dynamic-v1.0.0';

// Arquivos essenciais para cache
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Arquivos de modelos de IA (serão cacheados dinamicamente)
const AI_MODEL_PATTERNS = [
  /huggingface\.co/,
  /cdn\.jsdelivr\.net.*transformers/,
  /unpkg\.com.*transformers/
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando AudioSplit Local Service Worker v1.0.0');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando arquivos estáticos');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('[SW] Arquivos estáticos cacheados com sucesso');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erro ao cachear arquivos estáticos:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando AudioSplit Local Service Worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Remove caches antigos
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('audiosplit-')) {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker ativado e pronto');
        return self.clients.claim();
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Estratégia Cache First para arquivos estáticos
  if (STATIC_FILES.some(file => url.pathname === file || url.pathname.endsWith(file))) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            console.log('[SW] Servindo do cache estático:', request.url);
            return response;
          }
          
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE_NAME)
                  .then((cache) => cache.put(request, responseClone));
              }
              return response;
            });
        })
        .catch(() => {
          // Fallback para offline
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
        })
    );
    return;
  }
  
  // Estratégia Cache First para modelos de IA
  if (AI_MODEL_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            console.log('[SW] Servindo modelo de IA do cache:', request.url);
            return response;
          }
          
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                console.log('[SW] Cacheando modelo de IA:', request.url);
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE_NAME)
                  .then((cache) => cache.put(request, responseClone));
              }
              return response;
            });
        })
        .catch((error) => {
          console.error('[SW] Erro ao buscar modelo de IA:', error);
          throw error;
        })
    );
    return;
  }
  
  // Estratégia Network First para outros recursos
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache recursos válidos dinamicamente
        if (response.status === 200 && request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME)
            .then((cache) => cache.put(request, responseClone));
        }
        return response;
      })
      .catch(() => {
        // Fallback para cache se offline
        return caches.match(request);
      })
  );
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      console.log('[SW] Recebido comando SKIP_WAITING');
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_SIZE':
      getCacheSize()
        .then((size) => {
          event.ports[0].postMessage({
            type: 'CACHE_SIZE_RESPONSE',
            payload: { size }
          });
        });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches()
        .then(() => {
          event.ports[0].postMessage({
            type: 'CACHE_CLEARED',
            payload: { success: true }
          });
        })
        .catch((error) => {
          event.ports[0].postMessage({
            type: 'CACHE_CLEARED',
            payload: { success: false, error: error.message }
          });
        });
      break;
      
    default:
      console.log('[SW] Mensagem desconhecida:', type);
  }
});

// Funções auxiliares
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  const deletePromises = cacheNames
    .filter(name => name.startsWith('audiosplit-'))
    .map(name => caches.delete(name));
  
  await Promise.all(deletePromises);
  console.log('[SW] Todos os caches foram limpos');
}

// Notificações de atualização
self.addEventListener('updatefound', () => {
  console.log('[SW] Nova versão encontrada, preparando atualização...');
});

// Log de inicialização
console.log('[SW] AudioSplit Local Service Worker carregado - v1.0.0');
console.log('[SW] Recursos offline habilitados');
console.log('[SW] Cache de modelos de IA ativo');
console.log('[SW] PWA pronto para instalação');

