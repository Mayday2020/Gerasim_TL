import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from "./App";

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
    changeFilter: (value: FilterValuesType) => void
}

function Todolist(props: TodolistPropsType) {
    console.log('Todolist rendered')
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
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
                />
                <button onClick={ addTask }>+</button>
            </div>
            <ul>
                {
                    props.tasks.map( t => {
                        const onRemoveHandler = () => {props.removeTask(t.id)}
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={ onRemoveHandler }> x </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={ onAllClickHandler }>All</button>
                <button onClick={ onActiveClickHandler }>Active</button>
                <button onClick={ onCompleteClickHandler }>Completed</button>
            </div>
        </div>
    )
}

export default Todolist