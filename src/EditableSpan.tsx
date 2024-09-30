import { ChangeEvent, useState } from "react"

type PropsType = {
  title: string
  onChange: (newTitle: string) => void
}

export function EditableSpan(props: PropsType) {

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')

  const activateEditableSpan = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const changeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

  return (
    editMode
      ? <input value={title} onBlur={deactivateEditMode} onChange={changeTaskTitle} autoFocus />
      : <span onDoubleClick={activateEditableSpan}  >{props.title}</span>
  )
}