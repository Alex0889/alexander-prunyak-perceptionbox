import { FC, ReactNode } from 'react';
import s from './Page.module.scss';

interface PageProps {
  readonly children: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.root__container}>{children}</div>
    </div>
  );
};

export default Page;
