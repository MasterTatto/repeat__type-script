import {IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {createTaskAC} from "@/model/reducers/tasks_reducer.ts";
import {ChangeEvent, useState} from "react";
import {useAppDispatch} from "@/common/hooks/hooks.ts";

const HeaderAddedForm = ({idTodo}: { idTodo: string }) => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const handleAddedTaskHelper = () => {
        if (error) return
        dispatch(createTaskAC({title: value.trim(), idTodo}))
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
        <>
            <TextField size={'small'}
                       fullWidth
                       onChange={handleChangeTitleTask}
                       error={Boolean(error)}
                       helperText={error ? error : ''}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               handleAddedTaskHelper()
                           }
                       }} value={value}/>
            <IconButton onClick={handleAddedTaskHelper} disabled={Boolean(error)}>
                <AddIcon/>
            </IconButton>
        </>
    );
};

export default HeaderAddedForm;