import s from "../styles.module.css";
import {Checkbox, IconButton} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch} from "@/common/hooks/hooks.ts";
import {changeStatusTaskAC, changeTitleTaskAC, deleteTaskAC} from "@/model/reducers/tasks_reducer.ts";
import InputSpan from "@/ui-kit/inputSpan";

interface IProps {
    isDone: boolean
    title: string
    id: string
    idTodo: string
}

const Item = ({isDone, title, id, idTodo}: IProps) => {
    const dispatch = useAppDispatch()

    return (
        <li className={s.li_item}>
            <div className={s.li_item_left}>
                <Checkbox checked={isDone}
                          onChange={(e) => dispatch(changeStatusTaskAC({id, isDone: e.target.checked, idTodo}))}/>
                <InputSpan isDone={isDone} title={title}
                           handleChange={(title: string) => dispatch(changeTitleTaskAC({title, idTodo, id}))}/>
            </div>
            <IconButton onClick={() => dispatch(deleteTaskAC({id, idTodo}))}>
                <DeleteForeverIcon/>
            </IconButton>
        </li>
    );
};

export default Item;