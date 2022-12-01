export type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type SearchPizzaParams = {
	sortBy: string;
	category: string;
	search: string;
	pageCount: number;
};

export interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}
