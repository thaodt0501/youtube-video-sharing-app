import ReactPlayer from 'react-player';
import { Article } from '../../types/article';
import { useEffect, useState } from 'react';

export function ArticlePreview({
  article: {
    link,
    // createdAt,
    // favorited,
    // favoritesCount,
    // slug,
    // title,
    // description,
    // tagList,
    // author: { image, username },
  },
}: {
  article: Article;
  isSubmitting: boolean;
  onFavoriteToggle?: () => void;
}) {
  const [title, setTitle] = useState('');
  useEffect(() => {
    fetch(`https://noembed.com/embed?dataType=json&url=${link}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
      });
  });

  return (
    <div className='article-preview'>
      <div style={{ display: 'flex', gap: 20 }}>
        {/*@ts-ignore*/}
        <ReactPlayer url={link} height={250} width={350} />
        <div>{title}</div>
      </div>
    </div>
  );
}

export function TagList({ tagList }: { tagList: string[] }) {
  return (
    <ul className='tag-list'>
      {tagList.map((tag) => (
        <li key={tag} className='tag-default tag-pill tag-outline'>
          {tag}
        </li>
      ))}
    </ul>
  );
}
