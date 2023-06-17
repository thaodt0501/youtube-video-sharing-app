import ReactPlayer from 'react-player';
import { Article } from '../../types/article';
import { useEffect, useState } from 'react';
import axios from 'axios';
import settings from '../../config/settings';

export function ArticlePreview({
  article: { link, sharedBy },
}: {
  article: Article;
  isSubmitting: boolean;
  onFavoriteToggle?: () => void;
}) {
  const [videoData, setVideoData] = useState<any>(null);
  const apiKey = settings.googleApiKey;

  useEffect(() => {
    const videoId = getVideoId(link);
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json(); // this will be a promise
      })
      .then((response) => {
        if (response.items.length > 0) {
          setVideoData(response.items[0].snippet);
        }
      })
      .catch((err) => console.log(err));
  }, [link]);

  return (
    <div className='article-preview'>
      <div style={{ display: 'flex', gap: 20, height: 250, overflow: 'hidden' }}>
        {/*@ts-ignore*/}
        <ReactPlayer url={link} height={250} width={350} />
        <div style={{ width: 'calc(100% - 350px)' }}>
          <p style={{ color: 'red' }}>{videoData?.title}</p>
          <p>Shared by: {sharedBy}</p>

          <p>{videoData?.description}</p>
        </div>
      </div>
    </div>
  );
}

function getVideoId(url: string = '') {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
