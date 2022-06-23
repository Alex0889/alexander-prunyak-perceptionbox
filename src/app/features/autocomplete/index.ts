import { createSlice } from '@reduxjs/toolkit';
import { ICharacter } from '../../interface/ICharacter';
import { getAutocomplete } from './thunks/getAutocomplete';

interface AutocompleteState {
  readonly autocomplete: {
    readonly entities: ICharacter[],
    readonly isLoading: boolean,
    readonly error: string | undefined,
  };
}

const initialState: AutocompleteState = {
  autocomplete: {
    entities: [],
    isLoading: false,
    error: undefined,
  },
};

const autocompleteSlice = createSlice({
  name: 'autocomplete',
  initialState,
  reducers: {
    clearAutocomplete: (state) => {
      state.autocomplete.entities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAutocomplete.pending, ({ autocomplete }) => {
        autocomplete.isLoading = true;
      })
      .addCase(getAutocomplete.fulfilled, ({ autocomplete }, { payload }) => {
        autocomplete.isLoading = false;
        autocomplete.entities = payload.results;
      })
      .addCase(getAutocomplete.rejected, ({autocomplete}, {error}) => {
        autocomplete.isLoading = false;
        autocomplete.error = error.message;
      });
  },
});

export const {clearAutocomplete} = autocompleteSlice.actions;

export default autocompleteSlice.reducer;
