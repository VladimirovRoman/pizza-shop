import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/filter/slice';

export const Search: React.FC = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState<string>('');
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 150),
		[]
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.main}>
			<svg
				className={styles.icon}
				enableBackground='new 0 0 32 32'
				id='Editable-line'
				version='1.1'
				viewBox='0 0 32 32'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle
					cx='14'
					cy='14'
					fill='none'
					id='XMLID_42_'
					r='9'
					stroke='#000000'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeMiterlimit='10'
					strokeWidth='2'
				/>
				<line
					fill='none'
					id='XMLID_44_'
					stroke='#000000'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeMiterlimit='10'
					strokeWidth='2'
					x1='27'
					x2='20.366'
					y1='27'
					y2='20.366'
				/>
			</svg>
			<input
				ref={inputRef}
				onChange={onChangeInput}
				value={value}
				className={styles.input}
				placeholder='поиск пиццы ...'
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clear}
					viewBox='0 0 48 48'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z' />
					<path d='M0 0h48v48H0z' fill='none' />
				</svg>
			)}
		</div>
	);
};

export default Search;
