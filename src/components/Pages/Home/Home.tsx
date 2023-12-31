import { getArticles, getFeed, getTags } from '../../../services/conduit';
import { store } from '../../../state/store';
import { useStoreWithInitializer } from '../../../state/storeHooks';
import { ArticlesViewer } from '../../ArticlesViewer/ArticlesViewer';
import { changePage, loadArticles, startLoadingArticles } from '../../ArticlesViewer/ArticlesViewer.slice';
import { ContainerPage } from '../../ContainerPage/ContainerPage';
import { changeTab, loadTags, startLoadingTags } from './Home.slice';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import React from 'react';
import { async } from 'q';
import settings from '../../../config/settings';
const { cloneElement } = React;

const ENDPOINT = settings.baseSocketUrl;

export function Home() {
  const { selectedTab } = useStoreWithInitializer(({ home }) => home, load);

  // @ts-ignore
  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('connect', function () {
      console.log('Connected');
      // Listen for 'videoCreated' event
      socket.on('videoCreated', async (video) => {
        console.log('New video created: ', video);
        toast(`${video.sharedBy} shared a new video`);
        const multipleArticles = await getFeedOrGlobalArticles();
        store.dispatch(loadArticles(multipleArticles));
      });
    });

    // Clean up the effect
    return () => socket.disconnect();
  }, []);

  return (
    <div className='home-page'>
      {renderBanner()}
      <ToastContainer />
      <ContainerPage>
        <div className='col-md-12'>
          <ArticlesViewer
            toggleClassName='feed-toggle'
            selectedTab={selectedTab}
            tabs={buildTabsNames(selectedTab)}
            onPageChange={onPageChange}
            onTabChange={onTabChange}
          />
        </div>
      </ContainerPage>
    </div>
  );
}

async function load() {
  store.dispatch(startLoadingArticles());
  store.dispatch(startLoadingTags());

  if (store.getState().app.user.isSome()) {
    store.dispatch(changeTab('Your Feed'));
  }

  const multipleArticles = await getFeedOrGlobalArticles();
  store.dispatch(loadArticles(multipleArticles));
}

function renderBanner() {
  return (
    <div className='banner'>
      <div className='container'>
        <h1 className='logo-font'>Funny Movies</h1>
        <p>A place to share your video.</p>
      </div>
    </div>
  );
}

function buildTabsNames(selectedTab: string) {
  const { user } = store.getState().app;

  return Array.from(new Set([...(user.isSome() ? ['Your Feed'] : []), 'Global Feed', selectedTab]));
}

async function onPageChange(index: number) {
  store.dispatch(changePage(index));

  const multipleArticles = await getFeedOrGlobalArticles({ offset: (index - 1) * 10 });
  store.dispatch(loadArticles(multipleArticles));
}

async function onTabChange(tab: string) {
  store.dispatch(changeTab(tab));
  store.dispatch(startLoadingArticles());

  const multipleArticles = await getFeedOrGlobalArticles();
  store.dispatch(loadArticles(multipleArticles));
}

async function getFeedOrGlobalArticles(filters = {}) {
  const { selectedTab } = store.getState().home;
  const finalFilters = {
    ...filters,
    tag: selectedTab.slice(2),
  };

  return await (selectedTab === 'Your Feed' ? getFeed : getArticles)(
    !selectedTab.startsWith('#') ? filters : finalFilters
  );
}
