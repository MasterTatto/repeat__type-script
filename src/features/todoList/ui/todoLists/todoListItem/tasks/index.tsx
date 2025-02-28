import Item from '@/features/todoList/ui/todoLists/todoListItem/tasks/todoItem'
import { Typography } from '@mui/material'
import { FilterType } from '@/app/App.tsx'
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks.ts'
import { fetchTasksTC, taskSelector } from '@/features/todoList/model/reducers/tasks_slice.ts'
import { useEffect } from 'react'
import { TaskStatus } from '@/common/enams/enums.ts'

interface IProps {
	filterType: FilterType
	idTodo: string
}

const Tasks = ({ filterType, idTodo }: IProps) => {
	const tasks = useAppSelector(taskSelector)
	const dispatch = useAppDispatch()
	const getTasks = () => {
		switch (filterType) {
			case 'active':
				return tasks[idTodo].filter((f) => f.status === TaskStatus.New)

			case 'completed':
				return tasks[idTodo].filter((f) => f.status === TaskStatus.Completed)

			default:
				return tasks[idTodo] || []
		}
	}

	const items = getTasks()

	useEffect(() => {
		dispatch(fetchTasksTC({ id: idTodo }))
	}, [idTodo])
	return items.length !== 0 ? (
		<ul>
			{items.map((task) => (
				<Item key={task.id} idTodo={idTodo} item={task} />
			))}
		</ul>
	) : (
		<Typography variant={'body1'} component={'p'}>
			Нет данных
		</Typography>
	)
}

export default Tasks
