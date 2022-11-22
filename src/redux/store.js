import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/filterSlice'

export const store = configureStore({
	reducer: { counter: counterSlice },
})
