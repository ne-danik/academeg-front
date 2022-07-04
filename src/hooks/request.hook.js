export const useRequest = (fetch, query) => {
  const url = import.meta.env.VITE_API_URL + ':' + import.meta.env.VITE_SRV_PORT + '/graphql';

  return fetch(
      url, {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      })
    .then(response => response.json())
    .catch(console.log)
}