export const getYoutubeVideos = async ({playlistId, limit = 6, page = ''}) => {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=status&part=snippet&maxResults=${limit}&pageToken=${page}&playlistId=${playlistId}&key=${import.meta.env.VITE_API_KEY_YOUTUBE}`;
  const response = await fetch(url);
  const data = await response.json();

  const _transformData = (item) => {
    return {
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url,
      video_id: item.snippet.resourceId.videoId
    }
  }

  if (response.ok) {
    const filteredData = data.items.filter(item => item.status.privacyStatus === 'public');
    return {
      nextPage: data.nextPageToken,
      data: filteredData.map(_transformData)
    };
  };

  return {
    status: response.status,
    error: new Error(`Не могу загрузить данные по адресу ${url}`)
  };
}