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
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    changeFilter: (value: FilterValuesType) => void
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
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if ( newTaskTitle.trim() === '') {
            setError('Title is required')
            setNewTaskTitle('')
            return
        }
        props.addTask(newTaskTitle.trim())
        setNewTaskTitle('')
    }


    const onAllClickHandler = () => { props.changeFilter('all')}
    const onCompleteClickHandler = () => { props.changeFilter('complete')}
    const onActiveClickHandler = () => { props.changeFilter('active')}

    return (
        <div>
            <h3>{props.title}</h3>
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
                        const onRemoveHandler = () => {props.removeTask(t.id)}
                        const onChangeCheckBoxHandler = () => {props.changeStatus(t.id, t.isDone)}
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
                <button className={props.filter === 'complete' ? 'active-filter' : ''} onClick={ onCompleteClickHandler }>Completed</button>
            </div>
        </div>
    )
}

export default Todolist