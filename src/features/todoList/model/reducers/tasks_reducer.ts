import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {deleteTodoListAC, newTodoListAC} from "./todolists_reducer.ts";

export interface ITaskItem {
    id: string
    title: string
    isDone: boolean
}

export type Task = Record<string, ITaskItem[]>

const initialState: Task = {}

export const deleteTaskAC = createAction<{ id: string, idTodo: string }>("tasks/deleteTask")
export const createTaskAC = createAction<{ title: string, idTodo: string }>("tasks/createTask")
export const changeStatusTaskAC = createAction<{
    id: string,
    idTodo: string,
    isDone: boolean
}>("tasks/changeStatusTask")
export const changeTitleTaskAC = createAction<{
    id: string,
    idTodo: string,
    title: string
}>("tasks/changeTitleTask")

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.idTodo].findIndex(f => f.id === action.payload.id)
            if (index !== -1) state[action.payload.idTodo].splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask = {
                isDone: false,
                title: action.payload.title,
                id: nanoid()
            }
            state[action.payload.idTodo].push(newTask)
        })
        .addCase(changeStatusTaskAC, (state, action) => {
            const element = state[action.payload.idTodo].find((f) => f.id === action.payload.id)
            if (element) element.isDone = action.payload.isDone
        })
        .addCase(changeTitleTaskAC, (state, action) => {
            const element = state[action.payload.idTodo].find((f) => f.id === action.payload.id)
            if (element) element.title = action.payload.title
        })
        .addCase(newTodoListAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodoListAC, (state, action) => {
            delete state[action.payload.id]
        })
})