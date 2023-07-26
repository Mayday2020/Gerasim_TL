import React, {useState} from 'react'
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
    addTask: () => void
    changeFilter: (value: FilterValuesType) => void
}

function Todolist(props: TodolistPropsType) {
    console.log('Todolist rendered')
    const [newTaskTitle, setNewTaskTitle] = useState('')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={
                    (e) => { setNewTaskTitle(e.currentTarget.value)}
                }/>
                <button onClick={ () => { props.addTask()}}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map( t => {
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={ () => {props.removeTask(t.id)} }> x </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={ () => { props.changeFilter('all')}}>All</button>
                <button onClick={ () => { props.changeFilter('active')}}>Active</button>
                <button onClick={ () => { props.changeFilter('complete')}}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist