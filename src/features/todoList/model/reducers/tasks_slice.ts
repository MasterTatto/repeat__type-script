import {createSlice, nanoid} from '@reduxjs/toolkit'
import {createTodoListTC, deleteTodoListTC} from '@/features/todoList/model/reducers/todolists_slice.ts'

export interface ITaskItem {
    id: string
    title: string
    isDone: boolean
}

export type Task = Record<string, ITaskItem[]>

export const tasksSlice = createSlice({
    initialState: {} as Task,
    name: 'tasks',
    reducers: (creators) => {
        return {
            deleteTaskAC: creators.reducer<{ id: string; idTodo: string }>((state, action) => {
                const index = state[action.payload.idTodo].findIndex((f) => f.id === action.payload.id)
                if (index !== -1) state[action.payload.idTodo].splice(index, 1)
            }),
            createTaskAC: creators.reducer<{ title: string; idTodo: string }>((state, action) => {

                const newTask = {
                    isDone: false,
                    title: action.payload.title,
                    id: nanoid(),
                }

                state[action.payload.idTodo].push(newTask)
            }),
            changeStatusTaskAC: creators.reducer<{
                id: string
                idTodo: string
                isDone: boolean
            }>((state, action) => {
                const element = state[action.payload.idTodo].find((f) => f.id === action.payload.id)
                if (element) element.isDone = action.payload.isDone
            }),
            changeTitleTaskAC: creators.reducer<{
                id: string
                idTodo: string
                title: string
            }>((state, action) => {
                const element = state[action.payload.idTodo].find((f) => f.id === action.payload.id)
                if (element) element.title = action.payload.title
            }),

            setAllTasks: creators.reducer<{ tasks: Task }>((_, action) => {
                return action.payload.tasks
            }),
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

export const {setAllTasks, deleteTaskAC, createTaskAC, changeStatusTaskAC, changeTitleTaskAC} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {taskSelector} = tasksSlice.selectors
