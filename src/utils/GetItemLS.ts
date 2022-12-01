import { CartItem } from '../redux/cart/types';
import { CalcTotalPrice } from './CalcTotalPrice';

export const GetItemLS = () => {
	const data = localStorage.getItem('cart');
	const items = data ? JSON.parse(data) : [];
	const totalPrice = CalcTotalPrice(items);

	return {
		items: items as CartItem[],
		totalPrice,
	};
};
