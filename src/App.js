import React from 'react'
import './scss/app.scss'
import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'

function App() {
	const [items, setItems] = React.useState([])

	React.useEffect(() => {
		fetch('https://63761837b5f0e1eb850277d5.mockapi.io/pizzas')
			.then((response) => response.json())
			.then((json) => {
				setItems(json)
			})
	}, [])

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{items.map((obj) => (
							<PizzaBlock key={obj.id} {...obj} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
