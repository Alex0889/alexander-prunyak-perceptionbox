import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet } from '../../../API';
import { IInfo } from '../../../interface/IInfo';
import { ICharacter } from '../../../interface/ICharacter';

interface CharactersResponse {
  readonly info: IInfo,
  readonly results: ICharacter[]
}

export const getAllCharacters = createAsyncThunk(
  'getAllCharacters',
  async (page: number, { rejectWithValue }) => {
    try {
      return await axiosGet<CharactersResponse>('/character?page=' + page);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
