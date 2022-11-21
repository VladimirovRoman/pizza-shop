import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import { SkeletonCard } from '../components/PizzaBlock/SkeletonCard'
import PizzaBlock from '../components/PizzaBlock/Items'

const Home = ({ searchValue }) => {
	const [items, setItems] = React.useState([])
	const [loadingItems, setLoadingItems] = React.useState(true)
	const [categoryId, setCategoryId] = React.useState(0)
	const [sortId, setSortId] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	React.useEffect(() => {
		setLoadingItems(true)
		fetch(
			`https://63761837b5f0e1eb850277d5.mockapi.io/pizzas?${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sortId.sortProperty}&order=asc`
		)
			.then((response) => response.json())
			.then((json) => {
				setItems(json)
				setLoadingItems(false)
			})
		window.scrollTo(0, 0) // здесь мы делаем скролл при начальном Рендеринге
	}, [categoryId, sortId])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					pizzaCategory={categoryId}
					onClickCategory={(id) => setCategoryId(id)}
				/>
				<Sort sorting={sortId} onClickSorting={(id) => setSortId(id)} />
			</div>

			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{loadingItems
					? [...new Array(6)].map((_, i) => <SkeletonCard key={i} />)
					: items.filter().map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</div>
	)
}

export default Home
