import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet } from '../../../API';
import { ICharacter } from '../../../interface/ICharacter';

export const getSomeCharacters = createAsyncThunk(
  'getSomeCharacters',
  async (charactersIds: number[], { rejectWithValue }) => {
    try {
      return await axiosGet<ICharacter[]>(`/character/[${charactersIds}]`);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
