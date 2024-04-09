import React from 'react'
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
}

function Todolist(props: TodolistPropsType) {
    console.log('Todolist rendered')

    const onAllClickHandler = () => { props.changeFilter('all', props.todolistId)}
    const onCompleteClickHandler = () => { props.changeFilter('completed', props.todolistId)}
    const onActiveClickHandler = () => { props.changeFilter('active', props.todolistId)}
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
            </h3> <button onClick={removeTodolist}> X </button>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map( t => {
                        const onRemoveHandler = () => {props.removeTask(t.id, props.todolistId)}
                        const onChangeStatusHandler = () => {props.changeStatus(t.id, t.isDone, props.todolistId)}
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(props.todolistId, t.id, newValue)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={ onRemoveHandler }> x </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={ onAllClickHandler }>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={ onActiveClickHandler }>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={ onCompleteClickHandler }>Completed</button>
            </div>
        </div>
    )
}

export default Todolist

