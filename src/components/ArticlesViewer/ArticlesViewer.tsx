import { Fragment } from 'react';
import { store } from '../../state/store';
import { useStore } from '../../state/storeHooks';
import { classObjectToClassName } from '../../types/style';
import { ArticlePreview } from '../ArticlePreview/ArticlePreview';
import { Pagination } from '../Pagination/Pagination';
import { ArticleViewerState, endSubmittingFavorite, startSubmittingFavorite } from './ArticlesViewer.slice';

export function ArticlesViewer({
  toggleClassName,
  tabs,
  selectedTab,
  onPageChange,
  onTabChange,
}: {
  toggleClassName: string;
  tabs: string[];
  selectedTab: string;
  onPageChange?: (index: number) => void;
  onTabChange?: (tab: string) => void;
}) {
  const { articles, articlesCount, currentPage } = useStore(({ articleViewer }) => articleViewer);

  return (
    <>
      <ArticlesTabSet {...{ tabs, selectedTab, toggleClassName, onTabChange }} />
      <ArticleList articles={articles} />
      <Pagination currentPage={currentPage} count={articlesCount} itemsPerPage={10} onPageChange={onPageChange} />
    </>
  );
}

function ArticlesTabSet({
  tabs,
  toggleClassName,
  selectedTab,
  onTabChange,
}: {
  tabs: string[];
  toggleClassName: string;
  selectedTab: string;
  onTabChange?: (tab: string) => void;
}) {
  return (
    <div className={toggleClassName}>
      <ul className='nav nav-pills outline-active'>
        {tabs.map((tab) => (
          <Tab key={tab} tab={tab} active={tab === selectedTab} onClick={() => onTabChange && onTabChange(tab)} />
        ))}
      </ul>
    </div>
  );
}

function Tab({ tab, active, onClick }: { tab: string; active: boolean; onClick: () => void }) {
  return (
    <li className='nav-item'>
      <a
        className={classObjectToClassName({ 'nav-link': true, active })}
        href='#'
        onClick={(ev) => {
          ev.preventDefault();
          onClick();
        }}
      >
        {tab}
      </a>
    </li>
  );
}

function ArticleList({ articles }: { articles: ArticleViewerState['articles'] }) {
  return articles.match({
    none: () => (
      <div className='article-preview' key={1}>
        Loading articles...
      </div>
    ),
    some: (articles) => (
      <>
        {articles.length === 0 && (
          <div className='article-preview' key={1}>
            No articles are here... yet.
          </div>
        )}
        {articles.map(({ article, isSubmitting }, index) => (
          <ArticlePreview
            key={article._id}
            article={article}
            isSubmitting={isSubmitting}
          />
        ))}
      </>
    ),
  });
}

