import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

const Pagination = ({ onChangePagination }) => {
	return (
		<ReactPaginate
			className={styles.main}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={(event) => onChangePagination(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination
