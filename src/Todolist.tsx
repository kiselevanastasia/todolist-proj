import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"
import './Todolist.css'

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: Array<TasksType>
  filter: FilterValuesType
  removeTask: (taskId: string) => void
  filterTasks: (filter: FilterValuesType) => void
  addTask: (newTaskTitle: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<null | string>(null)

  const onNewTaskTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const onAddTaskChangeHandler = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('пустое поле')
    }
  }

  const onKeyDownChangeHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addTask(newTaskTitle.trim())
        setNewTaskTitle('')
      } else {
        setError('пустое поле')
      }
    }
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTaskTitleChangeHandler}
          onKeyDown={onKeyDownChangeHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={onAddTaskChangeHandler}>+</button>
        {error && <div className={'error-message'} >{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map((el) => {
            const removeTaksHandler = () => props.removeTask(el.id)
            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(el.id, event.currentTarget.checked)
            }

            return (
              <li className={el.isDone ? 'is-done' : ''} key={el.id} >
                <input type="checkbox" onChange={changeTaskStatusHandler} checked={el.isDone} />
                <span>{el.title}</span>
                <button onClick={removeTaksHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={() => { props.filterTasks('all') }} >All</button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={() => { props.filterTasks('active') }} >Active</button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={() => { props.filterTasks('completed') }} >Completed</button>
      </div>
    </div >
  )
}