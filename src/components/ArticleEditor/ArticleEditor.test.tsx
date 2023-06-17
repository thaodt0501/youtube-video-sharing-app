import { act, fireEvent, render, screen } from '@testing-library/react';
import { store } from '../../state/store';
import { ArticleEditor } from './ArticleEditor';
import { addTag, initializeEditor, updateField } from './ArticleEditor.slice';

beforeEach(() => {
  act(() => {
    store.dispatch(initializeEditor());
    render(<ArticleEditor onSubmit={(ev) => ev.preventDefault()} />);
  });
});

it('Should update article text fields', async () => {
  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText('Youtube URL'), { target: { value: 'testTitle' } });

    store.dispatch(updateField({ name: 'tagList', value: 'df' }));
  });

  expect(store.getState().editor.article.title).toMatch('testTitle');
});
