let cache = new Map();
let promises = new Map();

export function load(data) {
  cache = new Map(data);
  promises = new Map();
}

export function dump() {
  return cache;
}

export function parse(data) {
  if (data) {
    load(JSON.parse(data));
  } else {
    load([]);
  }
}
export function stringify() {
  return JSON.stringify([...cache]);
}
export function clean() {
  cache.clear();
  promises.clear();
}

/** Create a resource that is Suspense and Promise compatible */
export function createResource(key, promise) {
  const id = JSON.stringify(key);

  // Start and cache the promise early
  if (!promises.has(id)) {
    promises.set(id, Promise.resolve(promise));
  }

  return {
    /** Either return value from the cache or throw the promise for suspense or error to boundry */
    read() {
      if (cache.has(id)) return cache.get(id);
      throw promises
        .get(id)
        .then((data) => {
          cache.set(id, data);
          return data;
        })
        .catch((e) => {
          throw e;
        });
    },
    /** Get the promise and update cache */
    get() {
      return promises.get(id).then((data) => {
        cache.set(id, data);
        return data;
      });
    },
    /** Delete caches */
    delete: () => {
      cache.delete(key);
      promises.delete(key);
    },
  };
}
