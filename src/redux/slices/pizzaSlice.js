import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async ({ category, sortBy, search, pageCount }, thunkAPI) => {
		const { data } = await axios.get(
			`https://63761837b5f0e1eb850277d5.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}${search}`
		)
		return data
	}
)

const initialState = {
	items: [],
	status: 'loading',
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = 'loading'
			state.items = []
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'success'
		},
		[fetchPizzas.rejected]: (state) => {
			state.status = 'error'
			state.items = []
		},
	},
})
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
