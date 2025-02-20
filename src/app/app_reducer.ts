import {createAction, createReducer} from "@reduxjs/toolkit";

export type ThemeMode = 'light' | 'dark'

const initialState = {
    themeMode: 'light' as ThemeMode
}

export const toggleThemeAC = createAction<{ themeMode: ThemeMode }>('app/toggleTheme')


export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(toggleThemeAC, (state, action) => {
            state.themeMode = action.payload.themeMode
        })
})