var CACHE_NAME = 'WELFORDIAN-CACHE-V2';
var urlsToCache = [
                    'index.html',
                    'botao.css',
                    'foto.jpg',
                    'principal.jpg',
                    'principal2.jpg',
                    'principal3.jpg',
                    'cadastro.html',
                    'cadastro1.html',
                    'casamento.html',
                    'fotos.casa/images.jpg',
                    'fotos.casa/images(1).jpg',
                    'fotos.casa/images (2).jpg',
                    'fotos.casa/images (3).jpg',
                    'fotos.casa/images (4).jpg',
                    'fotos.casa/images5.jpg',
                    'formatura.html',
                    'fotos.forma/images.jpg',
                    'fotos.forma/images(1).jpg',
                    'fotos.forma/images (2).jpg',
                    'fotos.forma/images(3).jpg',
                    'fotos.forma/images(4).jpg',
                    'fotos.forma/images(5).jpg',
                    'infantil.html',
                    'fotos.infa/images.jpg',
                    'fotos.infa/images2.jpg',
                    'fotos.infa/images3.jpg',
                    'fotos.infa/images4.jpg',
                    'fotos.infa/images5.jpg',
                    'fotos.infa/images6.jpg',
                    'pedidos.html',
                    'visitante.html',
                    '/'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  var reqURL = new URL(event.request.url);
  if (/lst.fm/.test(reqURL)) {
    event.respondWith(lastFMImageResponse(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }).catch(function(err) {
        return err;
      })
    );
  }
});

function lastFMImageResponse(request) {
  return caches.match(request).then(function(response) {
    if (response) {
      return response;
    }
    return fetch(request).then(function(response) {
      caches.open('lfm-images').then(function(cache) {
        cache.put(request, response);
      });

      return response.clone();
    });
  });
}