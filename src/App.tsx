import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
const { v4: uuidv4 } = require('uuid');


export type FilterValuesType = 'all' | 'complete' | 'active'

function App() {
    console.log('App rendered')
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: uuidv4(), title: 'Rick&Morty', isDone: true},
        {id: uuidv4(), title: 'Vikings', isDone: true},
        {id: uuidv4(), title: 'Futurama', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id:string) {
        let filteredTasks = tasks.filter( t => t.id !== id )
        setTasks(filteredTasks)
    }
    function addTask(title: string) {
        let newTask = {id: uuidv4(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function changeStatus(taskId: string, isDone: boolean){
        let task = tasks.find( t => t.id === taskId)
        if(task) {task.isDone = !isDone}
        setTasks([...tasks])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter( t => !t.isDone)
    }
    if (filter === 'complete') {
        tasksForTodolist = tasks.filter( t => t.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title='Movies'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                addTask={addTask}
                changeStatus={changeStatus}
                changeFilter={changeFilter}
                filter={filter}
            />
        </div>
    );
}

export default App;
