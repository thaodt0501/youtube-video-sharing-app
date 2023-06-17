import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import {
  getArticle,
  getArticleComments,
} from '../../../services/conduit';
import { store } from '../../../state/store';
import { Comment } from '../../../types/comment';
import { redirect } from '../../../types/location';
import { initializeApp, loadUser } from '../../App/App.slice';
import { ArticlePage } from './ArticlePage';

jest.mock('../../../services/conduit.ts');

const mockedGetArticle = getArticle as jest.Mock<ReturnType<typeof getArticle>>;
const mockedGetArticleComments = getArticleComments as jest.Mock<ReturnType<typeof getArticleComments>>;

const defaultArticle = {
  author: {
    bio: null,
    following: false,
    image: null,
    username: 'jake',
  },
  body: 'Test 1',
  createdAt: new Date(),
  description: 'Test 1',
  favorited: false,
  favoritesCount: 0,
  slug: 'test-pmy91z',
  tagList: [],
  title: 'Test',
  updatedAt: new Date(),
};

const defaultComment: Comment = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  body: 'It takes a Jacobian',
  author: {
    username: 'jake',
    bio: 'I work at statefarm',
    image: 'https://i.stack.imgur.com/xHWG8.jpg',
    following: false,
  },
};

async function renderWithPath(slug: string) {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Route path='/:slug'>
          <ArticlePage />
        </Route>
      </MemoryRouter>
    );
  });
}

describe('For guest', () => {
  beforeEach(async () => {
    await act(async () => {
      store.dispatch(initializeApp());
    });
  });

  it('Should redirect to home if it fails to load article', async () => {
    redirect('article/something');
    mockedGetArticle.mockRejectedValueOnce({});
    mockedGetArticleComments.mockResolvedValueOnce([]);
    await renderWithPath('sample-slug');

    expect(location.hash === '#/').toBeTruthy();
  });

})

describe('For non article owner User', () => {
  beforeEach(async () => {
    await act(async () => {
      store.dispatch(
        loadUser({
          email: 'jake@jake.jake',
          token: 'jwt.token.here',
          username: 'jake2',
          bio: 'I work at statefarm',
          image: null,
        })
      );
    });
  });
})
