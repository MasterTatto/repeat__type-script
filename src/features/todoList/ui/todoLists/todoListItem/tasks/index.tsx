import Item from "@/features/todoList/ui/todoLists/todoListItem/tasks/todoItem";
import {Typography} from "@mui/material";
import {FilterType} from "@/app/App.tsx";
import {useAppSelector} from "@/common/hooks/hooks.ts";
import {taskSelector} from "@/features/todoList/model/selectors/task.selector.ts";

interface IProps {
    filterType: FilterType
    idTodo: string

}

const Tasks = ({filterType, idTodo}: IProps) => {
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

    return items.length !== 0 ?
        <ul>
            {items.map((task) => <Item
                key={task.id}
                title={task.title} id={task.id}
                isDone={task.isDone}
                idTodo={idTodo}/>)}
        </ul> :
        <Typography variant={'body1'} component={'p'}>Нет данных</Typography>;
};

export default Tasks;