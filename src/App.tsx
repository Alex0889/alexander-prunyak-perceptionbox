import React, { lazy, Suspense, useState } from 'react';
import 'assets/scss/app.scss';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import { PageContext } from './assets/context/pagesContext';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth0 } from '@auth0/auth0-react';
import Empty from './components/Empty';
import Button from './components/Button';

const HomePage = lazy(() => import('pages/HomePage'));
const FavoritesPage = lazy(() => import('pages/FavoritesPage'));
const DetailsPage = lazy(() => import('pages/DetailsPage'));

function App() {
  const [page, setPage] = useState<number>(1);

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <PageContext.Provider value={{ page, setPage }}>
      <div className='wrapper'>
        {isAuthenticated ? (
          <>
            <Header />
            <Routes>
              <Route
                path='/'
                element={
                  <Suspense fallback={<Loader />}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path='/:id'
                element={
                  <Suspense fallback={<Loader />}>
                    <DetailsPage />
                  </Suspense>
                }
              />
              <Route
                path='/favorites'
                element={
                  <Suspense fallback={<Loader />}>
                    <FavoritesPage />
                  </Suspense>
                }
              />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </>
        ) : (
          <Empty>
            <Button onClick={() => loginWithRedirect()}>Login</Button>
          </Empty>
        )}
      </div>
    </PageContext.Provider>
  );
}

export default App;
