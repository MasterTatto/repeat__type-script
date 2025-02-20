import {RootState} from "@/app/store.ts";
import {Task} from "@/features/todoList/model/reducers/tasks_reducer.ts";

export const taskSelector = (state: RootState):Task => state.tasks