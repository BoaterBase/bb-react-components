import React, { Suspense } from 'react';

/** A helper to support suspend in ssr */
export default function Suspend({ fallback, resources, children }) {
  if (process.browser) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  } else {
    try {
      // If the children try and read a promise it will throw error we cant catch
      // So try to read the resources we need first and catch the promise if its not ready
      [].concat(resources).map((resource) => resource.read());
      return children;
    } catch (err) {
      // If error is a promise then switch to loading state where server is responsible for loading data
      if (err.then) {
        return fallback;
      } else {
        throw err;
      }
    }
  }
}
