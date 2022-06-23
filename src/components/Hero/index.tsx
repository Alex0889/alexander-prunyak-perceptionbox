import { FC } from 'react';
import FavoriteButton from '../FavoriteButton';
import clsx from 'clsx';
import s from './Hero.module.scss';
import { ICharacter } from '../../app/interface/ICharacter';

interface HeroProps {
  readonly className?: string;
  readonly character: ICharacter;
}

const Hero: FC<HeroProps> = (
  {
    className, character: { id, image, name },
  }) => {
  return (
    <div className={clsx(s.root, className)}>
      <img className={s.root__image} src={image} alt={name} />
      <FavoriteButton characterId={id} className={s.root__favBtn} />
    </div>
  );
};

export default Hero;
