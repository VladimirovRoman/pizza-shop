import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
	setCategoryId,
	setPageCount,
	setFilter,
} from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import { SkeletonCard } from '../components/PizzaBlock/SkeletonCard'
import { SearchContext } from '../App'

import PizzaBlock from '../components/PizzaBlock/Items'
import Pagination from '../components/Pagination'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { categoryId, sort, pageCount } = useSelector(
		(state) => state.filterSlice
	)

	const { searchValue } = React.useContext(SearchContext)
	const [items, setItems] = React.useState([])
	const [loadingItems, setLoadingItems] = React.useState(true) //скелетон

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const axiosPizzas = () => {
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
	}
	// Если изменили параметры и был первый рендер то в этом случае  ->
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				pageCount,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, pageCount])

	// Если был первый рендер, то проверяем URL - параметры и сохраняем в редаксе ->
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			)

			dispatch(
				setFilter({
					...params,
					sort,
				})
			)
			isSearch.current = true
		}
	}, [])

	// здесь запрашиваем пиццы при первом рендере ->
	React.useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			axiosPizzas()
		}
		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, pageCount])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					pizzaCategory={categoryId}
					onClickCategory={onClickCategory}
				/>
				<Sort />
			</div>

			<h2 className='content__title'>
				Все <span>пиццы</span>
			</h2>
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
