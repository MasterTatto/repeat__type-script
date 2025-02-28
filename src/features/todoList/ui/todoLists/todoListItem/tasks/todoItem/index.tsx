import s from '../../styles.module.css'
import { Checkbox, IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useAppDispatch } from '@/common/hooks/hooks.ts'
import EditableSpan from '@/common/components/editableSpan'
import { changeTaskTC, deleteTaskTC } from '@/features/todoList/model/reducers/tasks_slice.ts'
import { ITasks } from '@/features/todoList/api/tasksApi.types.ts'
import { TaskStatus } from '@/common/enams/enums.ts'

interface IProps {
	item: ITasks
	idTodo: string
}

const Item = ({ item, idTodo }: IProps) => {
	const dispatch = useAppDispatch()

	return (
		<li className={s.li_item}>
			<div className={s.li_item_left}>
				<Checkbox
					checked={item.status === TaskStatus.Completed}
					onChange={(e) =>
						dispatch(
							changeTaskTC({
								id: item.id,
								item: { ...item, status: e.target.checked ? TaskStatus.Completed : TaskStatus.New },
								todoID: idTodo,
							}),
						)
					}
				/>
				<EditableSpan
					isDone={item.status === TaskStatus.Completed}
					title={item.title}
					handleChange={(title: string) =>
						dispatch(
							changeTaskTC({
								item: { ...item, title: title },
								todoID: idTodo,
								id: item.id,
							}),
						)
					}
				/>
			</div>
			<IconButton onClick={() => dispatch(deleteTaskTC({ id: item.id, todoID: idTodo }))}>
				<DeleteForeverIcon />
			</IconButton>
		</li>
	)
}

export default Item
