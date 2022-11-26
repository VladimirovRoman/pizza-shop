import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	pageCount: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
}

const filterSlice = createSlice({
	name: 'filters',
	searchValue: '',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action) {
		state.searchValue = action.payload
		},
		setSortId(state, action) {
			state.sort = action.payload
		},
		setPageCount(state, action) {
			state.pageCount = action.payload
		},
		setFilter(state, action) {
			state.pageCount = Number(action.payload.pageCount)
			state.sort = action.payload.sort
			state.categoryId = Number(action.payload.categoryId)
		},
	},
})

export const sortSelect = (state) => state.filterSlice.sort

export const {
	setCategoryId,
	setSortId,
	setPageCount,
	setFilter,
	setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
