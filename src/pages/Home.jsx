import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId } from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import { SkeletonCard } from '../components/PizzaBlock/SkeletonCard'
import { SearchContext } from '../App'

import PizzaBlock from '../components/PizzaBlock/Items'
import Pagination from '../components/Pagination'

const Home = () => {
	const dispatch = useDispatch()
	const categoryId = useSelector((state) => state.filterSlice.categoryId)

	const { searchValue } = React.useContext(SearchContext)
	const [items, setItems] = React.useState([])
	const [loadingItems, setLoadingItems] = React.useState(true) //скелетон
	// const [categoryId, setCategoryId] = React.useState(0) // категории
	const [pagination, setPagination] = React.useState(1) //состояние  пагинации
	const [sortId, setSortId] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	React.useEffect(() => {
		setLoadingItems(true)
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const sortBy = sortId.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		fetch(
			`https://63761837b5f0e1eb850277d5.mockapi.io/pizzas?page=${pagination}&limit=4&${category}&sortBy=${sortBy}${search}` // запрос на бэк-енд
		)
			.then((response) => response.json()) // ответ в виде json
			.then((json) => {
				setItems(json)
				setLoadingItems(false)
			})
		window.scrollTo(0, 0) // скролл при начальном Рендеринге
	}, [categoryId, sortId, searchValue, pagination]) // массив зависимостей , функция в хуке отрабатывает при каждом изменении одного элемента в массиве зависимостей

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					pizzaCategory={categoryId}
					onClickCategory={onClickCategory}
				/>
				<Sort sorting={sortId} onClickSorting={(id) => setSortId(id)} />
			</div>

			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{loadingItems
					? [...new Array(6)].map((_, i) => <SkeletonCard key={i} />)
					: items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
			<Pagination onChangePagination={(e) => setPagination(e)} />
		</div>
	)
}

export default Home
