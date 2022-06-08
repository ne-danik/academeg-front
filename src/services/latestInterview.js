import * as data from '../db/latest_interview.json';

export const getLatestInterview = () => {
  if (data) {
    const attr = data?.data[0].attributes;
    return {
      title: attr?.title,
      subtitle: attr?.subtitle || '',
      video_id: attr?.video_id,
      preview: attr?.preview
    }
  }

  return {
    error: new Error(`Не могу загрузить данные`)
  }
}