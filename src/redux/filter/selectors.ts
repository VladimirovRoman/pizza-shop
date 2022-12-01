import { RootState } from '../store';

export const sortSelect = (state: RootState) => state.filterSlice.sort;

export const selectFilter = (state: RootState) => state.filterSlice;
