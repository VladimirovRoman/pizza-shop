import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {
	setCategoryId,
	setPageCount,
	setFilter,
	selectFilter,
} from '../redux/slices/filterSlice';

import {
	fetchPizzas,
	SearchPizzaParams,
	selectPizzaData,
} from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import SortPopup, { sortList } from '../components/Sort';
import { SkeletonCard } from '../components/PizzaBlock/SkeletonCard';

import PizzaBlock from '../components/PizzaBlock/Items';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, pageCount, searchValue } =
		useSelector(selectFilter);

	const onClickCategory = (index: number) => {
		dispatch(setCategoryId(index));
	};
	const onChangePage = (page: number) => {
		dispatch(setPageCount(page));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? String(categoryId) : '';
		const search = searchValue ? `&search=${searchValue}` : '';
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
	// Если изменили параметры и был первый рендер то в этом случае  ->
	// React.useEffect(() => {
	// 	if (isMounted.current) {
	// 		const queryString = qs.stringify({
	// 			sortProperty: sort.sortProperty,
	// 			categoryId,
	// 			pageCount,
	// 		});
	// 		navigate(`?${queryString}`);
	// 	}
	// 	isMounted.current = true;
	// }, [categoryId, sort.sortProperty, pageCount]);

	// Если был первый рендер, то проверяем URL - параметры и сохраняем в редаксе ->
	// React.useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(
	// 			window.location.search.substring(1)
	// 		) as unknown as SearchPizzaParams;
	// 		const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
	// 		dispatch(
	// 			setFilter({
	// 				searchValue: params.search,
	// 				categoryId: Number(params.category),
	// 				pageCount: Number(params.pageCount),
	// 				sort: sort || sortList[0],
	// 			})
	// 		);
	// 	}
	// 	isMounted.current = true;
	// }, []);

	// здесь запрашиваем пиццы при первом рендере ->
	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, pageCount]);

	const skeleton = [...new Array(6)].map((_, i) => <SkeletonCard key={i} />);
	const pizzaBlock = items.map((obj: any) => (
		<Link key={obj.id} to={`/pizza/${obj.id}`}>
			{' '}
			<PizzaBlock {...obj} />
		</Link>
	));

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					pizzaCategory={categoryId}
					onClickCategory={onClickCategory}
				/>
				<SortPopup />
			</div>

			<h2 className='content__title'>
				Все <span>пиццы</span>
			</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>К сожалению произошла ошибка</h2>
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
