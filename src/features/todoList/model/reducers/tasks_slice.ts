import { createTodoListTC, deleteTodoListTC } from '@/features/todoList/model/reducers/todolists_slice.ts'
import { createAppSlice } from '@/common/utils/createAppSlice.ts'
import { ITasks } from '@/features/todoList/api/tasksApi.types.ts'
import { tasksApi } from '@/features/todoList/api/tasksApi.ts'
import { toggleStatus } from '@/app/app_slice.ts'

export type Task = Record<string, ITasks[]>

export const tasksSlice = createAppSlice({
	initialState: {} as Task,
	name: 'tasks',
	reducers: (creators) => {
		return {
			fetchTasksTC: creators.asyncThunk(
				async (arg: { id: string }, thunkAPI) => {
					try {
						thunkAPI.dispatch(toggleStatus({ status: 'loading' }))
						const res = await tasksApi.getTasks(arg.id)
						thunkAPI.dispatch(toggleStatus({ status: 'succeeded' }))
						return { items: res.data.items, id: arg.id }
					} catch (e) {
						thunkAPI.dispatch(toggleStatus({ status: 'failed' }))
						thunkAPI.rejectWithValue(e)
					}
				},
				{
					fulfilled: (state, action) => {
						state[action.payload!.id] = action.payload!.items
					},
				},
			),
			createTaskTC: creators.asyncThunk(
				async (arg: { id: string; title: string }, thunkAPI) => {
					try {
						thunkAPI.dispatch(toggleStatus({ status: 'loading' }))
						const res = await tasksApi.createTask(arg.id, arg.title)
						thunkAPI.dispatch(toggleStatus({ status: 'succeeded' }))
						return { item: res.data.data.item, id: arg.id }
					} catch (e) {
						thunkAPI.dispatch(toggleStatus({ status: 'failed' }))
						thunkAPI.rejectWithValue(e)
					}
				},
				{
					fulfilled: (state, action) => {
						state[action.payload!.id].unshift(action.payload!.item)
					},
				},
			),
			deleteTaskTC: creators.asyncThunk(
				async (arg: { id: string; todoID: string }, thunkAPI) => {
					try {
						thunkAPI.dispatch(toggleStatus({ status: 'loading' }))
						await tasksApi.deleteTask(arg.todoID, arg.id)
						thunkAPI.dispatch(toggleStatus({ status: 'succeeded' }))
						return { id: arg.id, todoID: arg.todoID }
					} catch (e) {
						thunkAPI.dispatch(toggleStatus({ status: 'failed' }))
						thunkAPI.rejectWithValue(e)
					}
				},
				{
					fulfilled: (state, action) => {
						const index = state[action.payload!.todoID].findIndex((f) => f.id === action.payload!.id)
						if (index !== -1) state[action.payload!.todoID].splice(index, 1)
					},
				},
			),
			changeTaskTC: creators.asyncThunk(
				async (arg: { id: string; todoID: string; item: ITasks }, thunkAPI) => {
					try {
						thunkAPI.dispatch(toggleStatus({ status: 'loading' }))
						const res = await tasksApi.changeTask(arg.todoID, arg.id, arg.item)
						thunkAPI.dispatch(toggleStatus({ status: 'succeeded' }))
						return { item: res.data.data.item, id: arg.id, todoID: arg.todoID }
					} catch (e) {
						thunkAPI.dispatch(toggleStatus({ status: 'failed' }))
						thunkAPI.rejectWithValue(e)
					}
				},
				{
					fulfilled: (state, action) => {
						const index = state[action.payload!.todoID].findIndex((f) => f.id === action.payload!.id)
						if (index !== -1) state[action.payload!.todoID][index] = action.payload!.item
					},
				},
			),
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTodoListTC.fulfilled, (state, action) => {
				state[action.payload!.item.id] = []
			})

			.addCase(deleteTodoListTC.fulfilled, (state, action) => {
				delete state[action.payload!.id]
			})
	},
	selectors: {
		taskSelector: (state: Task) => state,
	},
})

export const { fetchTasksTC, createTaskTC, deleteTaskTC, changeTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { taskSelector } = tasksSlice.selectors
