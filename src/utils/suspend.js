export default function suspend(promise) {
  let data;
  let status = 'init';
  let error;

  const suspended = promise
    .then((response) => {
      data = response;
      status = 'done';
    })
    .catch((e) => {
      error = e;
      status = 'error';
    });

  return () => {
    if (status === 'init') {
      throw suspended;
    } else if (status === 'error') {
      throw error;
    }

    return data;
  };
}
