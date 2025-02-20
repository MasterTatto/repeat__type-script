import s from './styles.module.css'
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {newTodoListAC} from "@/model/reducers/todolists_reducer.ts";
import {useAppDispatch} from "@/common/hooks/hooks.ts";

const AddedTodoFrom = () => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState<string>('')

    const handleAddedTodo = (title: string) => dispatch(newTodoListAC(title))

    return (
        <div className={s.box}>
            <TextField placeholder={'Enter title todo list'}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               handleAddedTodo(value)
                               setValue('')
                           }
                       }}
                       fullWidth size={'small'} value={value}
                       onChange={(e) => setValue(e.target.value)}/>
            <Button size={'medium'} onClick={() => {
                handleAddedTodo(value)
                setValue('')
            }} variant={'contained'}>Добавить</Button>
        </div>
    );
};

export default AddedTodoFrom;