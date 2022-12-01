export enum SortPropertyEnum {
	RATING = 'rating',
	PRICE = 'price',
	TITLE = 'title',
}

export type SortItems = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	pageCount: number;
	sort: SortItems;
}
