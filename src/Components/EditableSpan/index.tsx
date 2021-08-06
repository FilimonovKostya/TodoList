import React, {ChangeEvent, FC, useState} from "react";

type Props = {
    titleName: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: FC<Props> = ({titleName, onChange}): JSX.Element => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const activateEditMode = (): void => {
        setEditMode(true)
        setTitle(titleName)
    }

    const activateViewMode = (): void => {
        setEditMode(false)
        onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>): void => setTitle(e.currentTarget.value)

    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onClick={activateEditMode}> {titleName} </span>
}