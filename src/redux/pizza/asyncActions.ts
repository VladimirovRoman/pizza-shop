import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, category, search, pageCount } = params;
		console.log(params, 4444);
		const { data } = await axios.get<Pizza[]>(
			`https://63761837b5f0e1eb850277d5.mockapi.io/pizzas`,
			{
				params: pickBy(
					{
						page: pageCount,
						limit: 4,
						category,
						sortBy,

						search,
					},
					identity
				),
			}
		);

		return data;
	}
);
