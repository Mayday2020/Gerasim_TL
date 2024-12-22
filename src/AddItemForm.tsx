import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
function AddItemForm(props: AddItemFormPropsType){
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setError('')
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if ( newTaskTitle.trim() === '') {
            setError('Title is required')
            setNewTaskTitle('')
            return
        }
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle('')
    }

    return <div>
        <TextField value={newTaskTitle}
               onChange={ onChangeHandler }
               onKeyPress={ onKeyPressHandler }
               error={!!error}
                   variant={'outlined'}
                   label={'Value'}
                   helperText={error}
        />
        <IconButton onClick={ addTask } color={'primary'}>
            <ControlPoint/>
        </IconButton>
    </div>
}

export default AddItemForm