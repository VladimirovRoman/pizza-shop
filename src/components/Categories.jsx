import React from 'react'

const Categories = () => {
	const [activeIndex, setActiveIndex] = React.useState(0)

	const onClickCategory = () => {
		setActiveIndex(0)
	}

	return (
		<div className='categories'>
			<ul>
				<li	
					onClick={() => onClickCategory()}
					className={activeIndex === 0 ? 'active ' : ''}
				>
					Все
				</li>
				<li className={activeIndex === 1 ? 'active ' : ''}>Мясные</li>
				<li className={activeIndex === 2 ? 'active ' : ''}>Вегетарианская</li>
				<li className={activeIndex === 3 ? 'active ' : ''}>Гриль</li>
				<li className={activeIndex === 4 ? 'active ' : ''}>Острые</li>
				<li className={activeIndex === 5 ? 'active ' : ''}>Закрытые</li>
			</ul>
		</div>
	)
}

export default Categories
