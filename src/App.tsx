import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type FilterValuesType = 'all' | 'complete' | 'active'

function App() {
    console.log('App rendered')

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'Rick&Morty', isDone: true},
        {id: 2, title: 'Vikings', isDone: true},
        {id: 3, title: 'Futurama', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id:number) {
        let filteredTasks = tasks.filter( t => t.id !== id )
        setTasks(filteredTasks)
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
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
