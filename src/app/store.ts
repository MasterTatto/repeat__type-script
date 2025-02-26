import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer, tasksSlice } from '@/features/todoList/model/reducers/tasks_slice.ts'
import { todolistsReducer, todolistsSlice } from '@/features/todoList/model/reducers/todolists_slice.ts'
import { appReducer, appSlice } from '@/app/app_slice.ts'

export const store = configureStore({
	reducer: {
		[tasksSlice.name]: tasksReducer,
		[todolistsSlice.name]: todolistsReducer,
		[appSlice.name]: appReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
