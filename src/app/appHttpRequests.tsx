import { type ChangeEvent, type CSSProperties, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { CreateItemForm, EditableSpan } from '@/common/components'
import { ITodoList } from '@/features/todoList/api/todolistApi.types.ts'
import { todolistApi } from '@/features/todoList/api/todolistApi.ts'
import { tasksApi } from '@/features/todoList/api/tasksApi.ts'
import { ITasks } from '@/features/todoList/api/tasksApi.types.ts'

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<ITodoList[]>([])

    const createTodolist = async (title: string) => {
        const res = await todolistApi.createTodoList(title)
        setTodolists([res.data.data.item, ...todolists])
    }

    const deleteTodolist = async (id: string) => {
        await todolistApi.deleteTodolist(id)
        setTodolists(todolists.filter((f) => f.id !== id))
    }

    const changeTodolistTitle = async (id: string, title: string) => {
        await todolistApi.changeTodolistTitle(id, title)
        setTodolists(todolists.map((el) => (el.id === id ? { ...el, title: title } : el)))
    }

    useEffect(() => {
        todolistApi.getTodoList().then((res) => {
            setTodolists(res.data)
        })
    }, [])

    return (
        <div style={{ margin: '20px' }}>
            <CreateItemForm handleClick={createTodolist} />
            {todolists.map((todolist: ITodoList) => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan title={todolist.title} handleChange={(title) => changeTodolistTitle(todolist.id, title)} />
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>

                    <Tasks id={todolist.id} />
                </div>
            ))}
        </div>
    )
}

const Tasks = ({ id }: { id: string }) => {
    const [tasks, setTasks] = useState<ITasks[]>([])

    const createTask = (title: string) => {
        tasksApi.createTask(id, title).then((res) => {
            setTasks([res.data.data.item, ...tasks])
        })
    }

    const deleteTask = async (taskId: string) => {
        tasksApi.deleteTask(id, taskId).then(() => {
            setTasks(tasks.filter((f) => f.id !== taskId))
        })
    }

    const changeTaskStatus = async (e: ChangeEvent<HTMLInputElement>, task: ITasks) => {
        tasksApi.changeTask(id, task.id, { ...task, status: Number(e.target.checked) }).then((res) => {
            const item = res.data.data.item
            setTasks(tasks.map((el) => (el.id === item.id ? item : el)))
        })
    }

    const changeTaskTitle = async (task: ITasks, title: string) => {
        tasksApi.changeTask(id, task.id, { ...task, title }).then((res) => {
            const item = res.data.data.item
            setTasks(tasks.map((el) => (el.id === item.id ? item : el)))
        })
    }

    const getTasks = () => {
        tasksApi.getTasks(id).then((res) => {
            setTasks(res.data.items)
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <CreateItemForm handleClick={(title) => createTask(title)} />
            {tasks?.map((task: ITasks) => (
                <div key={task.id}>
                    <Checkbox checked={Boolean(task.status)} onChange={(e) => changeTaskStatus(e, task)} />
                    <EditableSpan title={task.title} isDone={Boolean(task.status)} handleChange={(title) => changeTaskTitle(task, title)} />
                    <button onClick={() => deleteTask(task.id)}>x</button>
                </div>
            ))}
        </>
    )
}

export default AppHttpRequests

const container: CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
