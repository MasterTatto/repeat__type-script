import {RootState} from "@/app/store.ts";
import {ITodos} from "@/app/App.tsx";

export const todoListSelector = (state: RootState): ITodos[] => state.todolists