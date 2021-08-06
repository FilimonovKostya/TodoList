import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

type Props = {
    addItem: (title: string) => void
}

export const TodolistForm: FC<Props> = ({addItem}): JSX.Element => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => setTitle(e.currentTarget.value)

    const addTask = (): void => {
        const titleTrim = title.trim()

        if (titleTrim) {
            addItem(titleTrim)
            setTitle('')
            setError(null)
        } else {
            setError('Title is required')
            setTitle('')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        setError(null)
        e.key === 'Enter' && addTask()

    }

    return <div>
        <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}/>
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>

}