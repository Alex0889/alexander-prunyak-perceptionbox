import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet } from '../../../API';
import { IInfo } from '../../../interface/IInfo';
import { ICharacter } from '../../../interface/ICharacter';

interface CharactersResponse {
  readonly info: IInfo,
  readonly results: ICharacter[]
}

export const getAutocomplete = createAsyncThunk(
  'getAutocomplete',
  async (city: string, { rejectWithValue }) => {
    try {
      return await axiosGet<CharactersResponse>(`/character/?name=${city}`);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
