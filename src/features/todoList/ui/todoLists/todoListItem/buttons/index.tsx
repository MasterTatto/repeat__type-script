import {Box, Button} from "@mui/material";
import {changeFilterTodoListAC} from "@/features/todoList/model/reducers/todolists_reducer.ts";
import {FilterType} from "@/app/App.tsx";
import {useAppDispatch} from "@/common/hooks/hooks.ts";

interface IButton {
    key: FilterType,
    title: 'All' | 'Active' | 'Completed',

}

const buttons: IButton[] = [
    {key: "all", title: "All"},
    {key: "active", title: "Active"},
    {key: "completed", title: "Completed"},
]

interface IProps {
    filterType: FilterType
    idTodo: string
}

const Buttons = ({filterType, idTodo}: IProps) => {
    const dispatch = useAppDispatch()

    return (
        <Box gap={1} display={'flex'}>
            {buttons.map((el: IButton) => {
                return <Button fullWidth variant="contained"
                               sx={{backgroundColor: filterType === el.key ? 'red' : ''}}
                               key={el.key}
                               onClick={() => dispatch(changeFilterTodoListAC({filter: el.key, id: idTodo}))}>
                    {el.title}
                </Button>
            })}
        </Box>
    );
};

export default Buttons;