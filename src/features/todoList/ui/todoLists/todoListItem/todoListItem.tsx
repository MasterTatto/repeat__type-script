import s from './styles.module.css'
import HeaderTitle from '@/features/todoList/ui/todoLists/todoListItem/headerTitle'
import CreateItemForm from '@/common/components/createItemForm'
import { FilterType } from '@/app/App.tsx'
import Buttons from '@/features/todoList/ui/todoLists/todoListItem/buttons'
import Tasks from '@/features/todoList/ui/todoLists/todoListItem/tasks'
import { useAppDispatch } from '@/common/hooks/hooks.ts'
import { memo } from 'react'
import { createTaskTC } from '@/features/todoList/model/reducers/tasks_slice.ts'

type Props = {
	title: string
	idTodo: string
	filterType: FilterType
}

export const TodoListItem = memo(({ title, filterType, idTodo }: Props) => {
	const dispatch = useAppDispatch()

	const createTask = (title: string) => {
		dispatch(createTaskTC({ title: title, id: idTodo }))
	}

	return (
		<div className={s.todo}>
			<HeaderTitle idTodo={idTodo} title={title} />
			<CreateItemForm handleClick={createTask} />
			<Tasks idTodo={idTodo} filterType={filterType} />
			<Buttons filterType={filterType} idTodo={idTodo} />
		</div>
	)
})
