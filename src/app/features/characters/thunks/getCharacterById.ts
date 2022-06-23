import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet } from '../../../API';
import { ICharacter } from '../../../interface/ICharacter';

export const getCharacterById = createAsyncThunk(
  'getCharacterById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await axiosGet<ICharacter>(`/character/${id}`);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
