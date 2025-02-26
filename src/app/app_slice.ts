import { createSlice } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

export const appSlice = createSlice({
	initialState: {
		themeMode: 'light' as ThemeMode,
	},
	name: 'app',
	reducers: (creators) => ({
		toggleThemeAC: creators.reducer<{ themeMode: ThemeMode }>((state, action) => {
			state.themeMode = action.payload.themeMode
		}),
	}),
})

export const { toggleThemeAC } = appSlice.actions
export const appReducer = appSlice.reducer
