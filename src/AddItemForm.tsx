import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <input value={newTaskTitle}
               onChange={ onChangeHandler }
               onKeyPress={ onKeyPressHandler }
               className={error ? 'error': ''}
        />
        <button onClick={ addTask }>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}

export default AddItemForm