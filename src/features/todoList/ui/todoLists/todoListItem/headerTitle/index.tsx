import EditableSpan from "../../../../../../common/components/editableSpan";
import {deleteTodoListAC, newTitleTodoListAC} from "@/features/todoList/model/reducers/todolists_reducer.ts";
import {IconButton} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch} from "@/common/hooks/hooks.ts";
import s from "@/features/todoList/ui/todoLists/todoListItem/styles.module.css";

interface IProps {
    title: string
    idTodo: string
}

const HeaderTitle = ({title, idTodo}: IProps) => {
    const dispatch = useAppDispatch()

    return (
        <div className={s.header}>
            <EditableSpan isDone={null} title={title}
                          handleChange={(title: string) => dispatch(newTitleTodoListAC({id: idTodo, title: title}))}/>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
                onClick={() => dispatch(deleteTodoListAC({id: idTodo}))}
            >
                <DeleteForeverIcon sx={{color: 'red'}}/>
            </IconButton>
        </div>
    );
};

export default HeaderTitle;