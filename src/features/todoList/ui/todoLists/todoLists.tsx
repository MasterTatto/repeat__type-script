import { TodoListItem } from '@/features/todoList/ui/todoLists/todoListItem/todoListItem.tsx'
import { useAppSelector } from '@/common/hooks/hooks.ts'
import { todoListSelector } from '@/features/todoList/model/selectors/todolist.selector.ts'
import '@/app/App.css'

const TodoLists = () => {
    const todos = useAppSelector(todoListSelector)

    return (
        <div className={'wrapper'}>
            {todos.map((el: any) => {
                return <TodoListItem key={el.id} title={el.title} idTodo={el.id} filterType={el.filter} />
            })}
        </div>
    )
}

export default TodoLists
