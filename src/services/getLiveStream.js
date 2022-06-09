export const getLiveStreamStatus = async () => {
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=id&channelId=UCBXf4WdUWkQm4rcQYIGQL7g&eventType=live&type=video&key=${import.meta.env.VITE_API_KEY_YOUTUBE}`;

  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    const event = data?.items?.length ? true : false;
    return {
      event
    }
  };

  return {
    status: response.status,
    error: new Error(`Не могу загрузить данные по адресу ${url}`)
  };
}