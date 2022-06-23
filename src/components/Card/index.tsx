import { FC } from 'react';
import s from './Card.module.scss';
import { ICharacter } from '../../app/interface/ICharacter';
import Hero from '../Hero';
import clsx from 'clsx';

interface CardProps {
  readonly character: ICharacter;
  readonly className?: string;
}

const Card: FC<CardProps> = ({ character, className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <Hero character={character} />
      <h4 className={s.root__name}>{character.name}</h4>
    </div>
  );
};

export default Card;
