import React, { FC, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllCharacters } from '../app/features/characters/thunks/getAllCharacters';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { IPageContext, PageContext } from '../assets/context/pagesContext';
import List from '../components/List';
import { useNavigate, useSearchParams } from 'react-router-dom';

const HomePage: FC = () => {
  const {
    characters: { entities },
  } = useAppSelector();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { page } = useContext<IPageContext>(PageContext);

  useEffect(() => {
    dispatch(getAllCharacters(page));
    navigate('?page=' + page);
  }, []);

  useEffect(() => {
    if (page !== Number(searchParams.get('page'))) {
      dispatch(getAllCharacters(page));
      navigate('?page=' + page);
    }
  }, [dispatch, page]);

  return (
    <Page>
      {entities.characters && entities.characters.length > 0 && (
        <List entities={entities.characters} isLoading={entities.isLoading} />
      )}
      <Pagination />
    </Page>
  );
};

export default HomePage;
