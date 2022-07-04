import {
  useRequest
} from '../hooks/request.hook';

export const getPreviousVideo = async (params, fetch) => {

  const query = `query PreviousReleases {
    latestReleases(locale: "${params.locale}", sort: ["date:desc"], pagination: { start: 1, limit: 3 }) {
      data {
        attributes {
          title
          subtitle
          video_url
          video_id
          preview_url
          date
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
      preview_url: attr.preview_url,
      publishedAt: attr.date
    }
  }

  return response.data.latestReleases.data.map(_transformData)
};