import React from 'react'

const Categories = ({ pizzaCategory, onClickCategory }) => {
	
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className='categories'>
			<ul>
				{categories.map((value, i) => (
					<li
						key={i}
						onClick={() => onClickCategory(i)}
						className={pizzaCategory === i ? 'active' : ''}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
