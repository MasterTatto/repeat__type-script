import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
	{
		ignores: ['dist', 'node_modules'], // 📌 Убеждаемся, что dist игнорируется
	},
	js.configs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
		},
		plugins: {
			'@typescript-eslint': ts,
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'error', // ❌ Запрещает any
			'no-undef': 'off', // Отключаем правило no-undef для глобальных типов
			'no-unused-vars': 'off', // Отключаем правило для параметров аргументов типизации функций
			'@typescript-eslint/no-unused-vars': 'error', // Отключаем правило для параметров аргументов типизации функций
		},
	},
]
