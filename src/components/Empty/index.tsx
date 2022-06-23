import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import s from './Empty.module.scss';

interface EmptyProps {
  readonly className?: string;
  readonly children: ReactNode;
}

const Empty: FC<EmptyProps> = (
  {
    className,
    children,
  }) => {
  return (
    <div className={clsx(s.root, className)}>
      {children}
    </div>
  );
};

export default Empty;
