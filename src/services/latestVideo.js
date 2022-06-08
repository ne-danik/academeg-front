import * as data from '../db/latest_video.json';

export const getLatestVideo = () => {
  if (data) {
    const attr = data?.data[0].attributes;
    return {
      title: attr?.video_name,
      subtitle: attr?.video_subtitle || '',
      video_id: attr?.video_url,
      thumb_default: attr?.video_preview
    };
  }

  return {
    error: new Error(`Не могу загрузить данные`)
  };
};