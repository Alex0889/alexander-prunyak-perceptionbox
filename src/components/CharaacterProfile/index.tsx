import { FC } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { ICharacter } from '../../app/interface/ICharacter';
import s from './CharacterProfile.module.scss';
import clsx from 'clsx';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import Hero from '../Hero';

interface CharacterProfileProps {
  readonly character: ICharacter;
  readonly className?: string;
}

const CharacterProfile: FC<CharacterProfileProps> = ({ character, className }) => {
  const { name, species, status, location, created, gender, episode } = character;

  const navigate = useNavigate();

  const toggleColor = () => {
    switch (status) {
      case 'Alive':
        return `${s.root__status_alive}`;
      case 'Dead':
        return `${s.root__status_dead}`;
    }
  };

  const handleClickGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={clsx(s.root, className)}>
      <Button onClick={handleClickGoBack} className={s.root__btn}>⇦ Go Back</Button>
      <div className={s.root__bottom}>
        <Hero character={character} className={s.root__hero}/>
        <div className={s.root__info}>
          <h4 className={s.root__name}>{name}</h4>
          <p><span className={clsx(toggleColor(), s.root__status)}>{status}</span> - {species}</p>
          <p><b>Gender:</b> {gender}</p>
          <p><b>Last known location:</b> {location.name}</p>
          <ul className={s.root__list}>
            {
              episode.length > 0 && episode.map(title => (
                <li key={title}>
                  <a href={title} target='_blank'
                     rel='noreferrer'>{title}</a>
                </li>))
            }
          </ul>
          <p><b>Created: </b>{format(parseISO(created), 'MM/dd/yyyy')}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterProfile;
