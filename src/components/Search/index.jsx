import React from 'react'

import styles from './Search.module.scss'

const Search = () => {
	return (
		<div>
			<svg
				height='512'
				color='black'
				viewBox='0 0 512 512'
				xmlns='http://www.w3.org/2000/svg'
			></svg>
			<input className={styles.root} placeholder='поиск пиццы ...' />
		</div>
	)
}

export default Search
