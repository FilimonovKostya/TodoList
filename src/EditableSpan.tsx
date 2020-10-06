import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => setEditMode(true)
    const activateViewMode = () => setEditMode(false)

    return editMode
        ? <input value={props.title} onBlur={activateViewMode} autoFocus/>
        : <span onClick={activateEditMode}> {props.title} </span>
}