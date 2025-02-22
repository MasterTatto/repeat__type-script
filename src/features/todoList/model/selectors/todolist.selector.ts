import { RootState } from '@/app/store.ts'
import { ITodos } from '@/features/todoList/model/reducers/todolists_reducer.ts'

export const todoListSelector = (state: RootState): ITodos[] => state.todolists
