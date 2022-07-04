export const useRequest = (fetch, query) => {
  const url = import.meta.env.VITE_DB_URL;

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