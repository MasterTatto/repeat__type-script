// import {expect, test} from 'vitest'
// import {changeFilterTodoListAC, todolistsReducer} from "../reducers/todolists_reducer.ts";
// import {ITodos} from "@/app/App.tsx";
// import {nanoid} from "@reduxjs/toolkit";
//
// test('correct todolist should be deleted', () => {
//     const todolistId1 = nanoid()
//     const todolistId2 = nanoid()
//
//     // 1. Стартовый state
//     const startState: ITodos[] = [
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'},
//     ]
//
//     // 2. Действие
//     const action = changeFilterTodoListAC('active', todolistId1);
//     const endState = todolistsReducer(startState, action)
//
//     // 3. Проверка, что действие измененило state соответствующим образом
//     // в массиве останется один тудулист
//     expect(endState.length).toBe(2)
//     // удалится нужный тудулист, не любой
//     expect(endState[0].filter).toBe('active')
// })