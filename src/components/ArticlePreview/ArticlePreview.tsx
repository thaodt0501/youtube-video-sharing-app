import ReactPlayer from 'react-player';
import { Article } from '../../types/article';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function ArticlePreview({
  article: { link, sharedBy },
}: {
  article: Article;
  isSubmitting: boolean;
  onFavoriteToggle?: () => void;
}) {
  const [videoData, setVideoData] = useState(null);
  const [title, setTitle] = useState('');
  const apiKey = 'AIzaSyC5Rz6roWoIWONhCj7xr4aLBBunfTtBeJo'; // replace with your YouTube API Key
  const videoId = '9VnhkpcEs74'; // replace with your YouTube video id
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.items.length > 0) {
          console.log(`response`, response);
          setVideoData(response.data.items[0].snippet);
        } else {
          console.log('No data found for the given video ID.');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://noembed.com/embed?dataType=json&url=${link}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
      });
  }, []);
  return (
    <div className='article-preview'>
      <div style={{ display: 'flex', gap: 20 }}>
        {/*@ts-ignore*/}
        <ReactPlayer url={link} height={250} width={350} />
        <div style={{ width: 'calc(100% - 350px)' }}>
          <p style={{ color: 'red' }}>{title}</p>
          <p>Shared by: {sharedBy}</p>
        </div>
      </div>
    </div>
  );
}
