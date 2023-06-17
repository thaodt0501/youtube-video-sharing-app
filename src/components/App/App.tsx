import axios from 'axios';
import { Fragment } from 'react';
import { HashRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { getUser } from '../../services/conduit';
import { store } from '../../state/store';
import { useStoreWithInitializer } from '../../state/storeHooks';
import { EditArticle } from '../Pages/EditArticle/EditArticle';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Home } from '../Pages/Home/Home';
import { Login } from '../Pages/Login/Login';
import { NewArticle } from '../Pages/NewArticle/NewArticle';
import { Register } from '../Pages/Register/Register';
import { endLoad, loadUser } from './App.slice';
import { ArticlePage } from '../Pages/ArticlePage/ArticlePage';
import { Settings } from '../Pages/Settings/Settings';

export function App() {
  const { loading, user } = useStoreWithInitializer(({ app }) => app, load);

  const userIsLogged = user.isSome();

  return (
    <HashRouter>
      {!loading && (
        <>
          <Header />
          <Switch>
            <GuestOnlyRoute exact path='/login' userIsLogged={userIsLogged}>
              <Login />
            </GuestOnlyRoute>
            <GuestOnlyRoute exact path='/register' userIsLogged={userIsLogged}>
              <Register />
            </GuestOnlyRoute>
            <UserOnlyRoute exact path='/editor' userIsLogged={userIsLogged}>
              <NewArticle />
            </UserOnlyRoute>
            <UserOnlyRoute exact path='/editor/:slug' userIsLogged={userIsLogged}>
              <EditArticle />
            </UserOnlyRoute>
            <Route path='/article/:slug'>
              <ArticlePage />
            </Route>
            <Route exact path='/'>
              <Home />
            </Route>
            <UserOnlyRoute exact path='/settings' userIsLogged={userIsLogged}>
              <Settings />
            </UserOnlyRoute>
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
          <Footer />
        </>
      )}
    </HashRouter>
  );
}

async function load() {
  const token = localStorage.getItem('token');
  if (!store.getState().app.loading || !token) {
    store.dispatch(endLoad());
    return;
  }
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  try {
    store.dispatch(loadUser(await getUser()));
  } catch {
    store.dispatch(endLoad());
  }
}

/* istanbul ignore next */
function GuestOnlyRoute({
  children,
  userIsLogged,
  ...rest
}: { children: JSX.Element | JSX.Element[]; userIsLogged: boolean } & RouteProps) {
  return (
    <Route {...rest}>
      {children}
      {userIsLogged && <Redirect to='/' />}
    </Route>
  );
}

/* istanbul ignore next */
function UserOnlyRoute({
  children,
  userIsLogged,
  ...rest
}: { children: JSX.Element | JSX.Element[]; userIsLogged: boolean } & RouteProps) {
  return (
    <Route {...rest}>
      {children}
      {!userIsLogged && <Redirect to='/' />}
    </Route>
  );
}
