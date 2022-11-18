import React from 'react'
import styles from './NotFoundInfo.module.scss'

console.log(styles)

const NotFoundInfo = () => {
	return (
		<div className={styles.root}>
			<h1>
				<span>🥺</span>
				<br />
				Ничего не найдено
			</h1>
			<p className={styles.text}>К сожалению данная страница отсутствует</p>
		</div>
	)
}

export default NotFoundInfo
