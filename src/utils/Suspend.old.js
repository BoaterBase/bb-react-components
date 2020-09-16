import React, { useState, useEffect } from 'react';

/* Convert an object of promises to suspense and apply to component as props */
export default function Suspend({ $, Component, ...props }) {
  const promise = Promise.all(Object.entries($).map(([key, promise]) => promise.then((result) => [key, result]))).then((result) => Object.fromEntries(result));
  promise.then((r) => console.log(r));

  const [state, setState] = useState();

  //if (state.then) throw new Promise((r) => r());
  //throw Promise.all(Object.entries($).map(([key, promise]) => promise.then((result) => [key, result]))).then((results) => console.log(results));

  return <Component {...props} />;
}
