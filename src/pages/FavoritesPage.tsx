import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getSomeCharacters } from 'app/features/characters/thunks/getSomeCharacters';
import { storage } from 'assets/helpers/storage';
import Page from 'components/Page';
import List from 'components/List';
import Empty from '../components/Empty';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { clearFavorites } from '../app/features/characters';

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    characters: { favorites },
  } = useAppSelector();
  const navigate = useNavigate();

  useEffect(() => {
    const favoritesItems = storage.getItem('favorites');
    if (favoritesItems && favoritesItems.length > 0) {
      dispatch(getSomeCharacters(favoritesItems));
    } else {
      dispatch(clearFavorites());
    }
  }, [dispatch]);

  const handleClickGoBack = () => {
    navigate(-1);
  };

  return (
    <Page>
      {favorites.characters && favorites.characters.length > 0 ? (
        <List entities={favorites.characters} isLoading={favorites.isLoading} />
      ) : (
        <Empty>
          <p>You have no favorites</p>
          <Button onClick={handleClickGoBack}>⇦ Go Back</Button>
        </Empty>
      )}
    </Page>
  );
};

export default FavoritesPage;
