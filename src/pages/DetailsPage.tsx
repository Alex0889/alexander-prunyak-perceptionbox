import { FC, useEffect } from 'react';
import CharacterProfile from '../components/CharaacterProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getCharacterById } from '../app/features/characters/thunks/getCharacterById';
import Page from '../components/Page';

const DetailsPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    characters: { entity },
  } = useAppSelector();

  const navigate = useNavigate();

  useEffect(() => {
    if (id && /^\d+$/.test(id)) {
      dispatch(getCharacterById(Number(id)));
    } else {
      navigate('/');
    }
  }, [dispatch, id, navigate]);

  return (
    <Page>
      {entity.character && <CharacterProfile character={entity.character} />}
    </Page>
  );
};

export default DetailsPage;
