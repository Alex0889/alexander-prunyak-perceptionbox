import { FC } from 'react';
import Page from '../components/Page';
import Empty from '../components/Empty';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleClickGoBack = () => {
    navigate('/');
  };

  return (
    <Page>
      <Empty>
        <p style={{ fontSize: '40px' }}>404</p>
        <p>Nothing found</p>
        <Button onClick={handleClickGoBack}>⇦ Go Back</Button>
      </Empty>
    </Page>
  );
};

export default NotFoundPage;
