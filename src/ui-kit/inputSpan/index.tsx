import {useState} from 'react';
import {TextField} from "@mui/material";

interface IProps {
    title: string
    isDone: boolean | null
    handleChange: (title: string) => void
}

const InputSpan = ({title, isDone, handleChange}: IProps) => {
    const [isInput, setIsInput] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)

    return isInput ?
        <TextField size={'small'} autoFocus onBlur={() => {
            handleChange(value)
            setIsInput((prev) => !prev)
        }} value={value} onChange={(e) => {
            setValue(e.target.value)
        }}/> : <span style={{color: isDone === null ? '' : (isDone ? 'green' : 'red')}}
                     onDoubleClick={() => setIsInput((prev) => !prev)}>{title}</span>;
};

export default InputSpan;