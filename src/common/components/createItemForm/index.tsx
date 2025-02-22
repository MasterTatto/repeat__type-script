import { IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ChangeEvent, useState } from 'react'
import s from '@/features/todoList/ui/todoLists/todoListItem/styles.module.css'

type IProps = {
    handleClick: (title: string) => void
}

const CreateItemForm = ({ handleClick }: IProps) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const handleAddedTaskHelper = () => {
        if (error) return
        handleClick(value.trim())
        setValue('')
    }

    const handleChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length >= 10) {
            setError('Лимит 10 символов')
        } else {
            setError(null)
        }
        setValue(e.target.value)
    }
    return (
        <div className={s.added_task}>
            <TextField
                size={'small'}
                fullWidth
                onChange={handleChangeTitleTask}
                error={Boolean(error)}
                helperText={error ? error : ''}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddedTaskHelper()
                    }
                }}
                value={value}
            />
            <IconButton onClick={handleAddedTaskHelper} disabled={Boolean(error)}>
                <AddIcon />
            </IconButton>
        </div>
    )
}

export default CreateItemForm
