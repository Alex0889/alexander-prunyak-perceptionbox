import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import s from './Autocomplete.module.scss';
import debounce from 'lodash.debounce';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearAutocomplete } from '../../app/features/autocomplete';
import { getAutocomplete } from '../../app/features/autocomplete/thunks/getAutocomplete';
import { getCharacterById } from '../../app/features/characters/thunks/getCharacterById';
import { useNavigate } from 'react-router-dom';

interface AutocompleteProps {
  readonly className?: string;
}

const Autocomplete: FC<AutocompleteProps> = ({ className }) => {
  const { autocomplete: { autocomplete } } = useAppSelector();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [value, setValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutsideAutocomplete(event: MouseEvent) {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        dispatch(clearAutocomplete());
        setValue('');
      }
    }

    document.body.addEventListener('click', handleClickOutsideAutocomplete);
    return () => {
      document.body.removeEventListener('click', handleClickOutsideAutocomplete);
    };
  }, [dispatch, listRef]);

  const handleAutocomplete = (idCharacter: number): void => {
    dispatch(getCharacterById(idCharacter));
    navigate('/' + idCharacter);
    dispatch(clearAutocomplete());
  };

  const inputDebounce = useCallback(
    debounce((str) => dispatch(getAutocomplete(str)), 500),
    [],
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    inputDebounce(inputValue);
  };

  const handleClickClear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={clsx(s.root, className)}>
      <div className={s.root__form}>
        <input
          ref={inputRef}
          className={s.root__input}
          type='text'
          placeholder='Search...'
          value={value}
          onChange={handleChangeInput}
        />
        {value && (
          <svg
            onClick={handleClickClear}
            height='24px'
            width='24px'
            id='Layer_1'
            version='1.1'
            viewBox='0 0 512 512'
            xmlSpace='preserve'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
          >
            <path
              d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
          </svg>
        )}
      </div>
      {autocomplete.entities && autocomplete.entities.length !== 0 &&
      <div ref={listRef} className={s.root__characters}>
        {
          autocomplete.entities.slice(0, 10).map(item => (
            <div
              key={item.id}
              onClick={() => {
                handleAutocomplete(item.id);
              }}
              className={s.root__characters_item}>
              {item.name}
            </div>))}
      </div>
      }
    </div>
  );
};

export default Autocomplete;
