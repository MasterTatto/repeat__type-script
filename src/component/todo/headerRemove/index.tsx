import InputSpan from "../../../ui-kit/inputSpan";
import {deleteTodoListAC, newTitleTodoListAC} from "@/model/reducers/todolists_reducer.ts";
import {IconButton} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch} from "@/common/hooks/hooks.ts";

interface IProps {
    title:string
    idTodo:string
}
const HeaderRemove = ({title,idTodo}:IProps) => {
    const dispatch = useAppDispatch()

    return (
        <>
            <InputSpan isDone={null} title={title}
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
        </>
    );
};

export default HeaderRemove;