import { createContext } from 'react';

export interface IPageContext {
  page: number;
  setPage: Function;
}

export const PageContext = createContext<IPageContext>(
  {} as IPageContext,
);