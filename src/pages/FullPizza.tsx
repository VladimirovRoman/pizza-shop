import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { stringify } from 'querystring'

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string
		price: number
		title: string
	}>()

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

	if (pizza === undefined) {
		return <> Загрузка ...</>
	}
	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='' />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} </h4>
		</div>
	)
}

export default FullPizza
