//adicionar ao cache todos os arquivos estáticos
var CACHE_NAME = 'static-v1';
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/botao.css',
                '/manifest.json',
                '/vendor.js',
            ]);
        })
    )}
)
    

        //Ao ativar atualiza o cache se necessário
 var CACHE_NAME = 'static-v1';
     self.addEventListener('activate', function activator(event) {
        event.waitUntil(
             caches.keys().then(function (keys) {
                 return Promise.all(keys
                     .filter(function (key) {
                        return key.indexOf(CACHE_NAME) !== 0;
                        
                    })
                 .map(function (key) {
                 return caches.delete(key);
                     })
                     );
                 
             })
             );
         
     });

    self.addEventListener('fetch', function (event) {
         event.respondWith(
             caches.match(event.request).then(function (cachedResponse) {
                 return cachedResponse || fetch(event.request);
                
            })
            );
        
    });


    // caches.open(cacheName)
    
    // Criar dados no cache
    // Add: Procura a requisição(arquivo) e a adiciona ao cache
    // AddAll: adiciona todos os arquivos listados ao cache e só é concluído com sucesso se todos
    //os arquivos forem adicionados(tudo ou nada)
     caches.open('example-cache').then(function (cache) {
        cache.add('/example-file.html');
        
    });
    
    // Procurar no cache
    // match: dada uma requisição, ela é procurada no cache.Ao(se) encontra - la a mesma é
    //retornada.
    // MatchAll: todos itens que fecharem com o parametro serão retornados e podem ser usados
     caches.open('example-cache').then(function (cache) {
         cache.matchAll('/images/').then(function (response) {
            response.forEach(function (element, index, array) {
                 cache.delete(element);
             });
             
         });
         
     })