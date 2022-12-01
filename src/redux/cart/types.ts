export type CartItem = {
	price: number;
	imageUrl: string;
	id: string;
	title: string;
	type: string;
	size: number;
	count: number;
};

export interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}
