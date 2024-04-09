import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import AddItemForm from "./AddItemForm";
const { v4: uuidv4 } = require('uuid');


export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log('App rendered')

    function removeTask(id:string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter( t => id !== t.id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }
    function addTask(title: string, todolistId: string) {
        let newTask = {id: uuidv4(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        tasksObj[todolistId] = [...tasks, newTask]
        setTasks({...tasksObj})
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string){
        let tasks = tasksObj[todolistId]
        let task = tasks.find( t => t.id === taskId)
        if( task ){
            task.isDone = !isDone
            setTasks({...tasksObj})
        }
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find( tl => tl.id === todolistId)
        if(todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter( tl => tl.id !== todolistId)
        setTodolists([...filteredTodolist])
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }
    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string){
        let tasks = tasksObj[todolistId]
        let task = tasks.find( t => t.id === taskId)
        if( task ){
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }
    function changeTodolistTitle(todolistId: string, newTitle: string){
       const todolist =  todolists.find( tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: 'What to learn', filter: 'all'},
        { id: todolistId2, title: 'Movies', filter: 'all'}
    ])
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: uuidv4(), title: 'JS', isDone: true},
            {id: uuidv4(), title: 'React', isDone: true},
            {id: uuidv4(), title: 'Angular', isDone: false}
        ],
        [todolistId2]: [
            {id: uuidv4(), title: 'Rick&Morty', isDone: true},
            {id: uuidv4(), title: 'Vikings', isDone: true},
            {id: uuidv4(), title: 'Futurama', isDone: false}
        ]
    })

    function AddTodolist(title: string){
        let todolist: TodolistType = {
            id: uuidv4(),
            title: title,
            filter: 'all'
        }
        setTodolists([todolist,  ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }
    return (
        <div className="App">
            <AddItemForm addItem={AddTodolist} />
            {
                todolists.map( tl => {
                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter( t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter( t => t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        changeFilter={changeFilter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
