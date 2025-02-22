import { instance } from '@/common/instance/instance.ts'
import { BaseResponse } from '@/common/types'
import { IResponseGetTasks, ITasks } from '@/features/todoList/api/tasksApi.types.ts'

export const tasksApi = {
    getTasks: (id: string) => {
        return instance.get<IResponseGetTasks>(`todo-lists/${id}/tasks`)
    },
    createTask: (id: string, title: string) => {
        return instance.post<BaseResponse<{ item: ITasks }>>(`todo-lists/${id}/tasks`, { title })
    },
    deleteTask: (id: string, taskId: string) => {
        return instance.delete<BaseResponse>(`todo-lists/${id}/tasks/${taskId}`)
    },
    changeTask: (id: string, taskId: string, payload: ITasks) => {
        return instance.put<BaseResponse<{ item: ITasks }>>(`todo-lists/${id}/tasks/${taskId}`, payload)
    },
}
