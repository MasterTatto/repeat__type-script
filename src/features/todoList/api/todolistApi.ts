import { instance } from '@/common/instance/instance.ts'
import { ITodoList } from '@/features/todoList/api/todolistApi.types.ts'
import { BaseResponse } from '@/common/types'

export const todolistApi = {
	getTodoList: () => {
		return instance.get<ITodoList[]>('todo-lists')
	},
	createTodoList: (title: string) => {
		return instance.post<BaseResponse<{ item: ITodoList }>>('todo-lists', {
			title,
		})
	},
	deleteTodolist: (id: string) => {
		return instance.delete<BaseResponse>(`todo-lists/${id}`)
	},
	changeTodolistTitle: (id: string, title: string) => {
		return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
	},
}
