import { FilterType } from '@/app/App.tsx'
import { ITodoList } from '@/features/todoList/api/todolistApi.types.ts'
import { todolistApi } from '@/features/todoList/api/todolistApi.ts'
import { createAppSlice } from '@/common/utils/createAppSlice.ts'
import { toggleStatus } from '@/app/app_slice.ts'

export interface ITodos extends ITodoList {
	filter: FilterType
}

export const todolistsSlice = createAppSlice({
	initialState: [] as ITodos[],
	name: 'todolists',
	reducers: (creators) => ({
		fetchTodoListsTC: creators.asyncThunk(
			async (_, thunkAPI) => {
				try {
					thunkAPI.dispatch(toggleStatus({ status: 'loading' }))
					const res = await todolistApi.getTodoList()
					thunkAPI.dispatch(toggleStatus({ status: 'succeeded' }))
					return { todolists: res.data }
				} catch (e) {
					thunkAPI.dispatch(toggleStatus({ status: 'failed' }))
					thunkAPI.rejectWithValue(e)
				}
			},
			{
				fulfilled: (state, action) => {
					action.payload?.todolists.forEach((tl) => state.push({ ...tl, filter: 'all' }))
				},
			},
		),
		createTodoListTC: creators.asyncThunk(
			async (args: { title: string }, thunkAPI) => {
				try {
					thunkAPI.dispatch(toggleStatus({ status: 'loading' }))
					const res = await todolistApi.createTodoList(args.title)
					thunkAPI.dispatch(toggleStatus({ status: 'succeeded' }))
					return res.data.data
				} catch (e) {
					thunkAPI.dispatch(toggleStatus({ status: 'failed' }))
					thunkAPI.rejectWithValue(e)
				}
			},
			{
				fulfilled: (state, action) => {
					state.unshift({ ...action.payload!.item, filter: 'all' })
				},
			},
		),
		changeFilterTodoListAC: creators.reducer<{ filter: FilterType; id: string }>((state, action) => {
			const element = state.find((f) => f.id === action.payload.id)
			if (element) element.filter = action.payload.filter
		}),
		deleteTodoListTC: creators.asyncThunk(
			async (arg: { id: string }, thunkAPI) => {
				try {
					thunkAPI.dispatch(toggleStatus({ status: 'loading' }))
					await todolistApi.deleteTodolist(arg.id)
					thunkAPI.dispatch(toggleStatus({ status: 'succeeded' }))
					return arg
				} catch (e) {
					thunkAPI.dispatch(toggleStatus({ status: 'failed' }))
					thunkAPI.rejectWithValue(e)
				}
			},
			{
				fulfilled: (state, action) => {
					const index = state.findIndex((f) => f.id === action.payload!.id)
					if (index !== -1) state.splice(index, 1)
				},
			},
		),
		changeTodoListTitleTC: creators.asyncThunk(
			async (arg: { id: string; title: string }, thunkAPI) => {
				try {
					thunkAPI.dispatch(toggleStatus({ status: 'loading' }))
					await todolistApi.changeTodolistTitle(arg.id, arg.title)
					thunkAPI.dispatch(toggleStatus({ status: 'succeeded' }))
					return arg
				} catch (e) {
					thunkAPI.dispatch(toggleStatus({ status: 'failed' }))
					return thunkAPI.rejectWithValue(e)
				}
			},
			{
				fulfilled: (state, action) => {
					const index = state.findIndex((f) => f.id === action.payload.id)
					if (index !== -1) state[index].title = action.payload.title
				},
			},
		),
	}),

	selectors: {
		todoListSelector: (state: ITodos[]) => state,
	},
})

export const { changeFilterTodoListAC, fetchTodoListsTC, createTodoListTC, deleteTodoListTC, changeTodoListTitleTC } =
	todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
export const { todoListSelector } = todolistsSlice.selectors
