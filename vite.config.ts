import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'node:path'

import eslint from 'vite-plugin-eslint'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': `${path.resolve(__dirname, 'src')}/`,
		},
	},
	server: {
		port: 3000,
	},
})
