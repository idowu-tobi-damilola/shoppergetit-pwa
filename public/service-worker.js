


self.addEventListener("install", (event) => {
  console.log("Service Worker Installing...");
  event.waitUntil(
    caches.open("static-v1").then((cache) => {
      return cache.addAll(["/offline.html"]); // Only cache offline.html
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== "static-v1") {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
      .then((response) => response || caches.match("/offline.html"))
  );
});
