import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId, setPageCount } from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import { SkeletonCard } from '../components/PizzaBlock/SkeletonCard'
import { SearchContext } from '../App'

import PizzaBlock from '../components/PizzaBlock/Items'
import Pagination from '../components/Pagination'

const Home = () => {
	const dispatch = useDispatch()
	const { categoryId, sort, pageCount } = useSelector(
		(state) => state.filterSlice
	)

	const { searchValue } = React.useContext(SearchContext)
	const [items, setItems] = React.useState([])
	const [loadingItems, setLoadingItems] = React.useState(true) //скелетон

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	React.useEffect(() => {
		setLoadingItems(true)
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const sortBy = sort.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(
				`https://63761837b5f0e1eb850277d5.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}${search}`
			)
			.then((res) => {
				setItems(res.data)
				setLoadingItems(false)
			})

		window.scrollTo(0, 0) // скролл при начальном Рендеринге
	}, [categoryId, sort.sortProperty, searchValue, pageCount]) // массив зависимостей , функция в хуке отрабатывает при каждом изменении одного элемента в массиве зависимостей

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					pizzaCategory={categoryId}
					onClickCategory={onClickCategory}
				/>
				<Sort />
			</div>

			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{loadingItems
					? [...new Array(6)].map((_, i) => <SkeletonCard key={i} />)
					: items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
			<Pagination onChangePagination={(e) => dispatch(setPageCount(e))} />
		</div>
	)
}

export default Home
