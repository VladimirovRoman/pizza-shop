import React from 'react'

const Categories = () => {
	const [activeIndex, setActiveIndex] = React.useState(0)

	const onClickCategory = (index) => {
		setActiveIndex(index)
	}

	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Острые', 'Закрытые']

	return (
		<div className='categories'>
			<ul>
				{categories.map((el) => (
					<li></li>
				))}
			</ul>
		</div>
	)
}

export default Categories
