import { FC, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import clsx from 'clsx';
import s from './Pagination.module.scss';
import { useAppSelector } from '../../app/hooks';
import { IPageContext, PageContext } from '../../assets/context/pagesContext';

interface PaginationProps {
  readonly className?: string;
}

const Pagination: FC<PaginationProps> = (
  {
    className,
  }) => {
  const { characters: { entities } } = useAppSelector();

  const { setPage, page } = useContext<IPageContext>(PageContext);

  const handlePageClick = (selected: number) => {
    setPage(selected + 1);
  };

  return <>
    {entities.info ? (
      <ReactPaginate
        className={clsx(className)}
        forcePage={page - 1}
        activeClassName={s.root__active}
        containerClassName={s.root}
        pageLinkClassName={s.root__link}
        breakLinkClassName={s.root__link}
        nextLinkClassName={s.root__link}
        previousLinkClassName={s.root__link}
        pageClassName={s.root__item}
        breakClassName={s.root__item}
        nextClassName={s.root__item}
        previousClassName={s.root__item}
        breakLabel='...'
        nextLabel={<>&raquo;</>}
        previousLabel={<>&laquo;</>}
        pageCount={entities.info.pages}
        onPageChange={({ selected }) => handlePageClick(selected)}
        pageRangeDisplayed={3}
        renderOnZeroPageCount={() => null}
      />) : null
    }
  </>;
};

export default Pagination;
