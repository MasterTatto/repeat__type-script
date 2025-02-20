import {RootState} from "@/app/store.ts";
import {Task} from "@/app/App.tsx";

export const taskSelector = (state: RootState):Task => state.tasks