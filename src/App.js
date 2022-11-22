import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './redux/slices/filterSlice'

import { Routes, Route } from 'react-router-dom'

import './scss/app.scss'

import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

export const SearchContext = React.createContext('')

function App() {
	const [searchValue, setSearchValue] = React.useState('')
	const count = useSelector((state) => state.counter.count)
	const dispatch = useDispatch()

	return (
		<div>
			<button
				aria-label='Increment value'
				onClick={() => dispatch(increment())}
			>
				Increment
			</button>
			<span>{count}</span>
			<button
				aria-label='Decrement value'
				onClick={() => dispatch(decrement())}
			>
				Decrement
			</button>
		</div>
		// <SearchContext.Provider value={{ searchValue, setSearchValue }}>
		// 	<div className='wrapper'>
		// 		<Header />
		// 		<div className='content'>
		// 			<Routes>
		// 				<Route path='/' element={<Home />} />
		// 				<Route path='/cart' element={<Cart />} />
		// 				<Route path='*' element={<NotFound />} />
		// 			</Routes>
		// 		</div>
		// 	</div>
		// </SearchContext.Provider>
	)
}

export default App
