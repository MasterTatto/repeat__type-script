import './App.css'
import TodoLists from '@/features/todoList/ui/todoLists/todoLists.tsx'
import CreateItemForm from '@/common/components/createItemForm'
import { useAppDispatch } from '@/common/hooks/hooks.ts'
import { newTodoListAC } from '@/features/todoList/model/reducers/todolists_reducer.ts'

const Main = () => {
    const dispatch = useAppDispatch()
    const handleAddedTodo = (title: string) => dispatch(newTodoListAC(title))

    return (
        <div className={'content'}>
            <CreateItemForm handleClick={handleAddedTodo} />
            <TodoLists />
        </div>
    )
}

export default Main
