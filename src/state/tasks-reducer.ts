import { FilterValuesType, TasksStateType } from "../App";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type  AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type  Action3Type = {
    type: '3'
    id: string
    title: string
}
export type  Action4Type = {
    type: '4'
    id: string
    filter: FilterValuesType
}
type ActionTypes = RemoveTaskActionType | AddTaskActionType | Action3Type | Action4Type

const {v4: uuidv4} = require('uuid');

export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type){
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter( t => t.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: uuidv4(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case '3': {
            const stateCopy = {...state}
            return stateCopy
        }
        case '4': {
            const stateCopy = {...state}
            return stateCopy
        }

        default: throw new Error('OMG')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}
export const action3AC = (todolistId: string, title: string): Action3Type => {
    return {type: '3', id: todolistId, title: title}
}
export const action4AC = (todolistId: string, filter: FilterValuesType): Action4Type => {
    return {type: '4', id: todolistId, filter: filter}
}
