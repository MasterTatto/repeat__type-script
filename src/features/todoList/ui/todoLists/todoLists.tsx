import { TodoListItem } from '@/features/todoList/ui/todoLists/todoListItem/todoListItem.tsx'
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks.ts'
import '@/app/App.css'
import { fetchTodoListsTC, todoListSelector } from '@/features/todoList/model/reducers/todolists_slice.ts'
import { useEffect } from 'react'

const TodoLists = () => {
	const todos = useAppSelector(todoListSelector)
	const dispatch = useAppDispatch()
	console.log('rerender')
	useEffect(() => {
		dispatch(fetchTodoListsTC())
	}, [])
	return (
		<div className={'wrapper'}>
			{todos.map((el) => {
				return <TodoListItem key={el.id} title={el.title} idTodo={el.id} filterType={el.filter} />
			})}
		</div>
	)
}

export default TodoLists
