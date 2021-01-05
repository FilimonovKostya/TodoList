import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import ControlPointIcon from '@material-ui/icons/ControlPoint';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled:boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const addTask = () => {

        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
            setError(null)
        } else {
            setError('Title is required')
            setTitle('')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <TextField value={title}
                       variant={"outlined"}
                       label={'Type value'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
                       disabled={props.disabled}
            />

            <IconButton onClick={addTask} color="primary" disabled={props.disabled}>
                <ControlPointIcon />
            </IconButton>
        </div>
    );
});
