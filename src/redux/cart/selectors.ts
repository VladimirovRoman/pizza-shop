import { RootState } from "../store";

export const cartSelect = (state: RootState) => state.cartSlice;

export const itemSelectById = (id: string) => (state: RootState) =>
	state.cartSlice.items.find((obj) => obj.id === id);
