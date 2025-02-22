import { FilterType } from '@/app/App.tsx'
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'

export interface ITodos {
    title: string
    id: string
    filter: FilterType
}

export const deleteTodoListAC = createAction<{ id: string }>('todolists/deleteTodoList')
export const newTitleTodoListAC = createAction<{ id: string; title: string }>('todolists/newTitleTodoList')
export const changeFilterTodoListAC = createAction<{ filter: FilterType; id: string }>('todolists/changeFilterTodoList')
export const newTodoListAC = createAction('todolists/newTodoList', (title: string) => {
    return { payload: { title, id: nanoid() } }
})
const initialState: ITodos[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodoListAC, (state, action) => {
            const index = state.findIndex((f) => f.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        })
        .addCase(newTitleTodoListAC, (state, action) => {
            const index = state.findIndex((f) => f.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        })
        .addCase(newTodoListAC, (state, action) => {
            const newTodo: ITodos = { title: action.payload?.title, id: action.payload.id, filter: 'all' }
            state.push(newTodo)
        })
        .addCase(changeFilterTodoListAC, (state, action) => {
            const element = state.find((f) => f.id === action.payload.id)
            if (element) element.filter = action.payload.filter
        })
})
