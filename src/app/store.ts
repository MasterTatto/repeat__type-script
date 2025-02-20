import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "@/model/reducers/tasks_reducer.ts";
import {todolistsReducer} from "@/model/reducers/todolists_reducer.ts";
import {appReducer} from "@/app/app_reducer.ts";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch