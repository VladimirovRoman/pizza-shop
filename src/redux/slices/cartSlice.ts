import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
	price: number;
	imageUrl: string;
	id: string;
	title: string;
	type: string;
	size: number;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.items.reduce((acc, num) => {
				return num.price * num.count + acc;
			}, 0);
		},

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItem(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const cartSelect = (state: RootState) => state.cartSlice;

export const itemSelectById = (id: string ) => (state: RootState) =>
	state.cartSlice.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
