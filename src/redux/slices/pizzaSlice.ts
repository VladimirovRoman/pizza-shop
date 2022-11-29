import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type PizzaItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: PizzaItem[];
	status: Status;
}

export const fetchPizzas = createAsyncThunk<
	PizzaItem[],
	Record<string, number>
>('pizza/fetchPizzasStatus', async (params) => {
	const { category, sortBy, search, pageCount } = params;
	const { data } = await axios.get<PizzaItem[]>(
		`https://63761837b5f0e1eb850277d5.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}${search}`
	);
	return data;
});

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const selectPizzaData = (state: RootState) => state.pizzaSlice;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
