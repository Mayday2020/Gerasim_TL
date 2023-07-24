import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {
    console.log('App rendered')
    return (
        <div className="App">
            <Todolist
                title='What to learn or not'
            />
            <Todolist title='Movies'/>
        </div>
    );
}

export default App;
