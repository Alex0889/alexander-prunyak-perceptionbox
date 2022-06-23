import { createSlice } from '@reduxjs/toolkit';
import { getAllCharacters } from './thunks/getAllCharacters';
import { ICharacter } from '../../interface/ICharacter';
import { getCharacterById } from './thunks/getCharacterById';
import { IInfo } from '../../interface/IInfo';
import { getSomeCharacters } from './thunks/getSomeCharacters';

export type CharactersState = {
  entities: {
    characters: ICharacter[],
    info: IInfo | null,
    isLoading: boolean,
    error: string | undefined,
  },
  entity: {
    character: ICharacter | null,
    isLoading: boolean,
    error: string | undefined,
  },
  favorites: {
    characters: ICharacter[],
    isLoading: boolean,
    error: string | undefined,
  }
};

const initialState: CharactersState = {
  entities: {
    characters: [],
    info: null,
    isLoading: false,
    error: undefined,
  },
  entity: {
    character: null,
    isLoading: false,
    error: undefined,
  },
  favorites: {
    characters: [],
    isLoading: false,
    error: undefined,
  },
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites.characters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacters.pending, (state) => {
        state.entities.isLoading = true;
      })
      .addCase(getAllCharacters.fulfilled, (state, { payload }) => {
        state.entities.isLoading = false;
        state.entities.characters = payload.results;
        state.entities.info = payload.info;
      })
      .addCase(getAllCharacters.rejected, (state, { payload }) => {
        state.entities.isLoading = false;
        state.entities.error = payload as string;
      });

    builder
      .addCase(getCharacterById.pending, (state) => {
        state.entities.isLoading = true;
      })
      .addCase(getCharacterById.fulfilled, (state, { payload }) => {
        state.entities.isLoading = false;
        state.entity.character = payload;
      })
      .addCase(getCharacterById.rejected, (state, { payload }) => {
        state.entities.isLoading = false;
        state.entities.error = payload as string;
      });

    builder
      .addCase(getSomeCharacters.pending, (state) => {
        state.favorites.isLoading = true;
      })
      .addCase(getSomeCharacters.fulfilled, (state, { payload }) => {
        state.favorites.isLoading = false;
        state.favorites.characters = payload;
      })
      .addCase(getSomeCharacters.rejected, (state, { payload }) => {
        state.favorites.isLoading = false;
        state.favorites.error = payload as string;
      });
  },
});

export const {clearFavorites} = charactersSlice.actions;

export default charactersSlice.reducer;