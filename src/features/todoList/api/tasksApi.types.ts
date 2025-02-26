import { TaskPriority, TaskStatus } from '@/common/enams/enums.ts'

export interface ITasks {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export interface IResponseGetTasks {
    error: string
    totalCount: number
    items: ITasks[]
}
