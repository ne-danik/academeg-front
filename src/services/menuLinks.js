import {
  useRequest
} from '../hooks/request.hook';

export const getMenuLinks = async (params, fetch, nameMenu) => {
  const query = `query Add {
    routers(locale: "${params.locale}", filters: {name_router: {eq: "${nameMenu}"}}){
      data{
        attributes{
          Route{
            title
            url
            external_link
          }
        }
      }
    }
  }
  `;

  const response = await useRequest(fetch, query);

  return response?.data?.routers?.data[0]?.attributes?.Route
}