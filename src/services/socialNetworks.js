import * as data from '../db/socials.json';

export const getSocialNetworks = () => {
  if (data) {
    return data.data.attributes
  };

  return {
    error: new Error(`Не могу загрузить данные`)
  };
};