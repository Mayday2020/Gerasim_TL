import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    filter: FilterValuesType
}

function Todolist(props: TodolistPropsType) {
    console.log('Todolist rendered')
    const [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setError('')
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode === 13) {
            props.addTask(newTaskTitle, props.todolistId)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if ( newTaskTitle.trim() === '') {
            setError('Title is required')
            setNewTaskTitle('')
            return
        }
        props.addTask(newTaskTitle.trim(), props.todolistId)
        setNewTaskTitle('')
    }


    const onAllClickHandler = () => { props.changeFilter('all', props.todolistId)}
    const onCompleteClickHandler = () => { props.changeFilter('completed', props.todolistId)}
    const onActiveClickHandler = () => { props.changeFilter('active', props.todolistId)}
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    return (
        <div>
            <h3>{props.title}</h3> <button onClick={removeTodolist}> X </button>
            <div>
                <input value={newTaskTitle}
                        onChange={ onChangeHandler }
                        onKeyPress={ onKeyPressHandler }
                        className={error ? 'error': ''}
                />
                <button onClick={ addTask }>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map( t => {
                        const onRemoveHandler = () => {props.removeTask(t.id, props.todolistId)}
                        const onChangeCheckBoxHandler = () => {props.changeStatus(t.id, t.isDone, props.todolistId)}
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeCheckBoxHandler}/>
                            <span>{t.title}</span>
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