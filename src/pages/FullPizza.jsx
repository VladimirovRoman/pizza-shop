import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const FullPizza = () => {
	const [pizza, setPizza] = React.useState()
	const { id } = useParams()

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://63761837b5f0e1eb850277d5.mockapi.io/pizzas/' + id
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при получении данных')
			}
		}

		fetchPizza()
	}, [])

	return (
		<div className='container'>
			<h2>{pizza.title}</h2>
			<h4>asd </h4>
		</div>
	)
}

export default FullPizza
