import {
  useRequest
} from '../hooks/request.hook';

export const getSocialNetworks = async (fetch) => {

  const query = `query Socials {
    socialNetwork{
      data{
        attributes{
          vk_public
          youtube_2nd
          youtube_daily
          instagram
          youtube
          vk_admin
          vk
          youtube_suprotec
          yandex_zen
        }
      }
    }
  }
  `;

  const response = await useRequest(fetch, query);

  return response.data.socialNetwork.data.attributes
};