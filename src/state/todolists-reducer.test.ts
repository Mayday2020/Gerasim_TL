import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType, ChangeTodolistTitleAC,
    ChangeTodolistTitleActionType,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodolistType} from '../App'

const {v4: uuidv4} = require('uuid');

test('correct todolist should be removed', () => {
    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'Movies', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
});

test('correct todolist should be added', () => {
    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()
    let newTodolistTitle = "New Todolist"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'Movies', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
});

test('correct todolist should change it`s name', () => {
    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()
    let newTodolistTitle = "New Todolist"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'Movies', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should changed', () => {
    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'Movies', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})