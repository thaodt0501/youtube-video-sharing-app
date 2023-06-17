import { Err, Ok } from '@hqoss/monads';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { createArticle } from '../../../services/conduit';
import { store } from '../../../state/store';
import { initializeEditor } from '../../ArticleEditor/ArticleEditor.slice';
import { NewArticle } from './NewArticle';

jest.mock('../../../services/conduit.ts');

const mockedCreateArticle = createArticle as jest.Mock<ReturnType<typeof createArticle>>;

beforeEach(() => {
  act(() => {
    store.dispatch(initializeEditor());
    render(<NewArticle />);
  });
});

it('Should update errors if publish article fails', async () => {
  mockedCreateArticle.mockResolvedValueOnce(Err({ title: ['too smol', 'much fun'] }));
  await act(async () => {
    fireEvent.click(screen.getByText('Share Movie'));
  });

  expect(screen.getByText('title too smol')).toBeInTheDocument();
  expect(screen.getByText('title much fun')).toBeInTheDocument();
});
