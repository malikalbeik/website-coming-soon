var CACHE_NAME = 'my-site-cache-v1';

var urlsToCache = [
  '/',
  '/profile.jpg',
  'responsive.css',
  'styles.css',
  'PoiretOne-Regular.ttf']

  self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {
      ignoreSearch: true
    })
    .then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
        console.log('response given from caches')
      }

      return fetch(event.request);
    }).catch(function(err) {
      console.log(err);
    })
  );
});
