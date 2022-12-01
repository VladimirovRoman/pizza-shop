import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, SortItems, SortPropertyEnum } from '../filter/types';


const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	pageCount: 1,
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RATING,
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
		setSortId(state, action: PayloadAction<SortItems>) {
			state.sort = action.payload;
		},
		setPageCount(state, action: PayloadAction<number>) {
			state.pageCount = action.payload;
		},
		setFilter(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.pageCount = Number(action.payload.pageCount);
				state.categoryId = Number(action.payload.categoryId);
				state.sort = action.payload.sort;
			} else {
				state.pageCount = 1;
				state.categoryId = 0;
				state.sort = {
					name: 'популярности',
					sortProperty: SortPropertyEnum.RATING,
				};
			}
		},
	},
});

export const {
	setCategoryId,
	setSortId,
	setPageCount,
	setFilter,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
