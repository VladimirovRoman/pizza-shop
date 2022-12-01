import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalcTotalPrice } from '../../utils/CalcTotalPrice';
import { GetItemLS } from '../../utils/GetItemLS';

import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = GetItemLS();

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
			state.totalPrice = CalcTotalPrice(state.items);
		},

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}

			state.totalPrice = CalcTotalPrice(state.items);
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
			state.totalPrice = CalcTotalPrice(state.items);
		},
		clearItem(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
