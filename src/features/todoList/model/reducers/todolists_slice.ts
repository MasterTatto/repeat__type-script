import {FilterType} from '@/app/App.tsx'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ITodoList} from '@/features/todoList/api/todolistApi.types.ts'
import {todolistApi} from '@/features/todoList/api/todolistApi.ts'
import {setAllTasks, Task} from "@/features/todoList/model/reducers/tasks_slice.ts";

export interface ITodos extends ITodoList {
    filter: FilterType
}


export const todolistsSlice = createSlice({
    initialState: [] as ITodos[],
    name: 'todolists',
    reducers: (creators) => ({
        changeFilterTodoListAC: creators.reducer<{ filter: FilterType; id: string }>((state, action) => {
            const element = state.find((f) => f.id === action.payload.id)
            if (element) element.filter = action.payload.filter
        }),
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchTodoListsTC.fulfilled, (state, action) => {
                action.payload?.todolists.forEach(tl => state.push({...tl, filter: 'all'}))
            })
            .addCase(fetchTodoListsTC.rejected, () => {
            })

            .addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(f => f.id === action.payload.id)
                if (index !== -1) state[index].title = action.payload.title
            })
            .addCase(changeTodoListTitleTC.rejected, () => {
            })

            .addCase(deleteTodoListTC.fulfilled, (state, action) => {
                const index = state.findIndex((f) => f.id === action.payload!.id)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(deleteTodoListTC.rejected, () => {
            })

            .addCase(createTodoListTC.fulfilled, (state, action) => {
                state.unshift({...action.payload!.item, filter: 'all'})
            })
            .addCase(createTodoListTC.rejected, () => {
            })
    },

    selectors: {
        todoListSelector: (state: ITodos[]) => state,
    },
})

export const createTodoListTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodoListTC`,
    async (args: { title: string }, thunkAPI) => {
        try {
            const res = await todolistApi.createTodoList(args.title)
            return res.data.data
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const deleteTodoListTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodoList`,
    async (arg: { id: string }, thunkAPI) => {
        try {
            await todolistApi.deleteTodolist(arg.id)
            return arg
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const fetchTodoListsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodoListsTC`,
    async (_, thunkAPI) => {
        try {
            const res = await todolistApi.getTodoList()
            const tasks: Task = {}
            res.data.forEach(tl => {
                tasks[tl.id] = []
            })
            thunkAPI.dispatch(setAllTasks({tasks: tasks}))
            return {todolists: res.data}
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const changeTodoListTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodoListTitleTC`,
    async (arg: { id: string, title: string }, thunkAPI) => {
        try {
            await todolistApi.changeTodolistTitle(arg.id, arg.title)
            return arg
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)


export const {
    changeFilterTodoListAC
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
export const {todoListSelector} = todolistsSlice.selectors

