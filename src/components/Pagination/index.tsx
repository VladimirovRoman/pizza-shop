import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
	currentPage: number;
	onChangePage: (id: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	onChangePage,
}) => {
	return (
		<ReactPaginate
			className={styles.main}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
		/>
	);
};

export default Pagination;
