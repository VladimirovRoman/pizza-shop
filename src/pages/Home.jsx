import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import { SkeletonCard } from '../components/PizzaBlock/SkeletonCard'
import PizzaBlock from '../components/PizzaBlock/Items'

const Home = () => {
	const [items, setItems] = React.useState([])
	const [loadingItems, setLoadingItems] = React.useState(true)

	React.useEffect(() => {
		fetch('https://63761837b5f0e1eb850277d5.mockapi.io/pizzas')
			.then((response) => response.json())
			.then((json) => {
				setItems(json)
				setLoadingItems(false)
			})
	}, [])
	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{loadingItems
					? [...new Array(6)].map((_, i) => <SkeletonCard key={i} />)
					: items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</>
	)
}

export default Home
