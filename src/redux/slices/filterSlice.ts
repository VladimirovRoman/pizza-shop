import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortItem = {
	name: string;
	sortProperty: 'popular' | 'rating' | 'title';
};

interface FilterSliceState {
	categoryId: number;
	searchValue: string;
	pageCount: number;
	sort: SortItem;
}

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	pageCount: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSortId(state, action: PayloadAction<SortItem>) {
			state.sort = action.payload;
		},
		setPageCount(state, action: PayloadAction<number>) {
			state.pageCount = action.payload;
		},
		setFilter(state, action: PayloadAction<FilterSliceState>) {
			state.pageCount = Number(action.payload.pageCount);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const sortSelect = (state: RootState) => state.filterSlice.sort;

export const selectFilterData = (state: RootState) => state.filterSlice;
export const {
	setCategoryId,
	setSortId,
	setPageCount,
	setFilter,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
