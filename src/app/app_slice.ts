import { createSlice } from '@reduxjs/toolkit'
import { RequestStatus } from '@/common/types'

export type ThemeMode = 'light' | 'dark'

export const appSlice = createSlice({
	initialState: {
		themeMode: 'light' as ThemeMode,
		status: 'idle' as RequestStatus,
	},
	name: 'app',
	reducers: (creators) => ({
		toggleThemeAC: creators.reducer<{ themeMode: ThemeMode }>((state, action) => {
			state.themeMode = action.payload.themeMode
		}),
		toggleStatus: creators.reducer<{ status: RequestStatus }>((state, action) => {
			state.status = action.payload.status
		}),
	}),
	selectors: {
		statusSelector: (state) => state.status,
	},
})

export const { toggleThemeAC, toggleStatus } = appSlice.actions
export const { statusSelector } = appSlice.selectors
export const appReducer = appSlice.reducer
