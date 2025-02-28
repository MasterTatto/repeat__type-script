export type FieldError = {
	error: string
	field: string
}

export interface BaseResponse<T = {}> {
	data: T
	resultCode: number
	messages: string[]
	fieldsErrors: FieldError[]
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
