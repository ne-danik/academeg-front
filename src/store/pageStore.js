import { writable } from "svelte/store";

export const pageStore = writable({});

export async function getPageData({ fetch, path }) {
  const response = await fetch(path);

  if (response.ok) {
    pageStore.set(await response.json());
    return {};
  }

  return {
    status: response.status,
    error: new Error(`Не могу загрузить данные по ${path}`)
  };
}