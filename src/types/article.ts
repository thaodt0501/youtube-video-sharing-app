import { array, boolean, Decoder, iso8601, number, object, string } from 'decoders';
import { Profile, profileDecoder } from './profile';

export interface Article {
  link: string;
  _id: string;
  __v: number;
  sharedBy: string;
}

export const articleDecoder: Decoder<Article> = object({
  link: string,
  _id: string,
  __v: number,
  sharedBy: string,
});

export interface MultipleArticles {
  articles: Article[];
  articlesCount: number;
}

export const multipleArticlesDecoder: Decoder<MultipleArticles> = object({
  articles: array(articleDecoder),
  articlesCount: number,
});

export interface ArticleForEditor {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ArticlesFilters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}
