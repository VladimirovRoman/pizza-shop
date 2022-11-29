import React from 'react';

type CategoriesProps = {
	pizzaCategory: number;
	onClickCategory: (index: number) => void;
};

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories: React.FC<CategoriesProps> = ({
	pizzaCategory,
	onClickCategory,
}) => {
	

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
	);
};

export default Categories;
