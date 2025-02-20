import './App.css'
import {useAppDispatch, useAppSelector} from "@/common/hooks/hooks.ts";
import {appSelector} from "@/model/selectors/app.selector.ts";
import {todoListSelector} from "@/model/selectors/todolist.selector.ts";
import {toggleThemeAC} from "@/app/app_reducer.ts";
import Header from "@/component/header";
import AddedTodoFrom from "@/component/addedTodoForm";
import {TodolistItem} from "@/component/todo/TodolistItem.tsx";


export interface ITaskItem {
    id: string
    title: string
    isDone: boolean
}

export type Task = {
    [key: string]: ITaskItem[]
}

export interface ITodos {
    title: string
    id: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'


export const App = () => {
    const dispatch = useAppDispatch()
    const {themeMode} = useAppSelector(appSelector)
    const todos = useAppSelector(todoListSelector)

    return (
        <div className="app">
            <button
                onClick={() => dispatch(toggleThemeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))}>toggle
                theme
            </button>
            <h3>{themeMode}</h3>
            <Header/>
            <div className={'content'}>
                <AddedTodoFrom/>

                <div className={'wrapper'}>
                    {todos.map((el) => {
                        return <TodolistItem
                            key={el.id}
                            title={el.title}
                            idTodo={el.id}
                            filterType={el.filter}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}