import { configureStore } from '@reduxjs/toolkit';
import characters from './features/characters';
import autocomplete from './features/autocomplete';

export const store = configureStore({
  reducer: {
    characters,
    autocomplete,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
