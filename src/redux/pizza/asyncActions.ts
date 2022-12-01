import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { category, sortBy, search, pageCount } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://63761837b5f0e1eb850277d5.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}${search}`
		);
		return data;
	}
);
