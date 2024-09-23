import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (taskId: string) => void
  filterTasks: (filter: FilterValuesType) => void
  addTask: (newTaskTitle: string) => void
}

export function Todolist(props: TodolistPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const onNewTaskTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }

  const onAddTaskChangeHandler = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle('')
  }

  const onKeyDownChangeHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
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
        />
        <button
          onClick={onAddTaskChangeHandler} >
          +
        </button>
      </div>
      <ul>
        {
          props.tasks.map((el) => {
            const removeTaksHandler = () => {
              props.removeTask(el.id)
            }
            return (
              <li key={el.id} >
                <input type="checkbox" checked={el.isDone} />
                <span>{el.title}</span>
                <button onClick={removeTaksHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button onClick={() => { props.filterTasks('all') }} >All</button>
        <button onClick={() => { props.filterTasks('active') }} >Active</button>
        <button onClick={() => { props.filterTasks('completed') }} >Completed</button>
      </div>
    </div>
  )
}