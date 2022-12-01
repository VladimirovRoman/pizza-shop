import React from 'react';

import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import { SkeletonCard } from '../components/PizzaBlock/SkeletonCard';

import PizzaBlock from '../components/PizzaBlock/Items';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setPageCount } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
	const dispatch = useAppDispatch();

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, pageCount, searchValue } =
		useSelector(selectFilter);

	const onClickCategory = React.useCallback((index: number) => {
		dispatch(setCategoryId(index));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setPageCount(page));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? String(categoryId) : '';
		const search = searchValue;
		const sortBy = sort.sortProperty.replace('-', '');

		dispatch(
			fetchPizzas({
				category,
				sortBy,
				search,
				pageCount,
			})
		);
		window.scrollTo(0, 0);
	};
	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, searchValue, pageCount]);

	const skeleton = [...new Array(6)].map((_, i) => <SkeletonCard key={i} />);
	const pizzaBlock = items.map((obj: any) => (
		<PizzaBlock key={obj.id} {...obj} />
	));

	console.log(categoryId);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					pizzaCategory={categoryId}
					onClickCategory={onClickCategory}
				/>
				<SortPopup value={sort} />
			</div>

			<h2 className='content__title'>
				Все <span>пиццы</span>
			</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>К сожалению произошла ошибка </h2>
					<p>Попробуйте зайти позднее</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeleton : pizzaBlock}
				</div>
			)}

			<Pagination currentPage={pageCount} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
