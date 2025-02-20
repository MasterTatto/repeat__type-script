import s from './styles.module.css'
import {Box, Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/common/hooks/hooks.ts";
import {taskSelector} from "@/model/selectors/task.selector.ts";
import HeaderRemove from "@/component/todo/headerRemove";
import HeaderAddedForm from "@/component/todo/headerAddedForm";
import {changeFilterTodoListAC} from "@/model/reducers/todolists_reducer.ts";
import {FilterType} from "@/app/App.tsx";
import Item from "@/component/todo/todoItem";


type Props = {
    title: string
    idTodo: string
    filterType: FilterType
}

interface IButton {
    key: FilterType,
    title: 'All' | 'Active' | 'Completed',

}

const buttons: IButton[] = [
    {key: "all", title: "All"},
    {key: "active", title: "Active"},
    {key: "completed", title: "Completed"},
]

export const TodolistItem = ({
                                 title,
                                 filterType,
                                 idTodo,
                             }: Props) => {
    const dispatch = useAppDispatch()

    const tasks = useAppSelector(taskSelector)

    const getTasks = () => {
        switch (filterType) {
            case "active":
                return tasks[idTodo].filter((f) => !f.isDone)

            case "completed":
                return tasks[idTodo].filter((f) => f.isDone)

            default:
                return tasks[idTodo]
        }
    }

    const items = getTasks()

    return (
        <div className={s.todo}>
            <div className={s.header}>
                <HeaderRemove idTodo={idTodo} title={title}/>
            </div>
            <div className={s.added_task}>
                <HeaderAddedForm idTodo={idTodo}/>
            </div>
            {items.length !== 0 ?
                <ul>
                    {items.map((task) => <Item
                        key={task.id}
                        title={task.title} id={task.id}
                        isDone={task.isDone}
                        idTodo={idTodo}/>)}
                </ul> :
                <Typography variant={'body1'} component={'p'}>Нет данных</Typography>}
            <Box gap={1} display={'flex'}>
                {buttons.map((el: IButton) => {
                    return <Button fullWidth variant="contained"
                                   sx={{backgroundColor: filterType === el.key ? 'red' : ''}}
                                   key={el.key}
                                   onClick={() => dispatch(changeFilterTodoListAC({filter: el.key, id: idTodo}))}>
                        {el.title}
                    </Button>
                })}

            </Box>
        </div>
    )
}
