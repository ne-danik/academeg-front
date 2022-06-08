import * as data from '../db/previous_video.json';

export const getPreviousVideo = () => {
  const _transformData = (item) => {
    const attr = item?.attributes;
    return {
      title: attr?.video_name,
      subtitle: attr?.video_subtitle || '',
      date: attr?.publishedAt,
      video_id: attr?.video_url,
      thumb: attr?.video_preview
    }
  }

  if (data) {
    return data.data.map(_transformData)
  };

  return {
    error: new Error(`Не могу загрузить данные`)
  };
};