import {
  useRequest
} from '../hooks/request.hook';

export const getLatestInterview = async (params, fetch) => {

  const query = `query LatestInterview {
    interviews(locale: "${params.locale}", sort: ["publishedAt:desc"], pagination: { limit: 1 }){
      data{
        attributes {
          title
          subtitle
          video_url
          video_id
          preview_url
        }
      }
    }
  }
  `;

  const response = await useRequest(fetch, query);

  const _transformData = (data) => {
    const attr = data.attributes
    return {
      title: attr.title,
      subtitle: attr.subtitle,
      video_url: attr.video_url,
      video_id: attr.video_id,
      preview_url: attr.preview_url
    }
  }

  return _transformData(response.data.interviews.data[0])
};