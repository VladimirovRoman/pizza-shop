import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza = () => {
	const [pizza, setPizza] = React.useState({})
	const { id } = useParams()
	const navigate = useNavigate()

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://63761837b5f0e1eb850277d5.mockapi.io/pizzas/' + id
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при получении данных')
				navigate('/')
			}
		}

		fetchPizza()
	}, [])

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='' />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}</h4>
		</div>
	)
}

export default FullPizza
