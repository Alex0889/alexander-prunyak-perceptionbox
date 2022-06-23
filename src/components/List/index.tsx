import { FC } from 'react';
import s from './List.module.scss';
import { ICharacter } from '../../app/interface/ICharacter';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Loader from '../Loader';
import clsx from 'clsx';

interface ListProps {
  readonly entities: ICharacter[];
  readonly isLoading: boolean;
  readonly className?: string;
}

const List: FC<ListProps> = ({ entities, isLoading, className }) => {
  return (
    <div className={clsx(s.root, className)}>
      {isLoading
        ? <Loader />
        : entities.map((item) => (
          <Link to={'/' + item.id} key={item.id}>
            <Card character={item} />
          </Link>
        ))}
    </div>
  );
};

export default List;
