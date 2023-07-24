import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

function App() {
    console.log('App rendered')

    let tasks1: Array<TaskType> = [
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'CSS', isDone: false}
    ]
    let tasks2: Array<TaskType> = [
        {id: 1, title: 'Rick&Morty', isDone: true},
        {id: 2, title: 'Vikings', isDone: true},
        {id: 3, title: 'Futurama', isDone: false}
    ]


    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasks1}
            />
            <Todolist title='Movies' tasks={tasks2}/>
        </div>
    );
}

export default App;
