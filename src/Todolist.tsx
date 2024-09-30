import React, { ChangeEvent } from "react"
import { AddItemForm } from "./AddItemForm"
import { FilterValuesType } from "./App"
import { EditableSpan } from "./EditableSpan"
import './Todolist.css'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  todolistId: string
  removeTask: (todolistId: string, taskId: string) => void
  filterTasks: (todolistId: string, filter: FilterValuesType) => void
  addTask: (todolistId: string, newTaskTitle: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: TodolistPropsType) {

  const onRemoveTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }

  const addTaskHandler = (title: string) => {
    props.addTask(props.todolistId, title)
  }

  const onChangeTodolistTitle = (newTitle: string) =>{
    props.changeTodolistTitle(props.todolistId, newTitle)
  }

  return (
    <div>
      <div className="todolist-title" >
        <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitle} /></h3>
        <button onClick={onRemoveTodolistHandler} >x</button>
      </div>
      <AddItemForm addItem={addTaskHandler} />
      <ul>
        {
          props.tasks.map((el) => {
            const removeTaksHandler = () => props.removeTask(props.todolistId, el.id)

            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(props.todolistId, el.id, event.currentTarget.checked)
            }

            const changeTaskTitleHandler = (newTitle: string) => {
              props.changeTaskTitle(props.todolistId, el.id, newTitle)
            }

            return (
              <li className={el.isDone ? 'is-done' : ''} key={el.id} >
                <input type="checkbox" onChange={changeTaskStatusHandler} checked={el.isDone} />
                <EditableSpan title={el.title} onChange={changeTaskTitleHandler} />
                <button onClick={removeTaksHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={() => { props.filterTasks(props.todolistId, 'all') }} >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={() => { props.filterTasks(props.todolistId, 'active') }} >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={() => { props.filterTasks(props.todolistId, 'completed') }} >
          Completed
        </button>
      </div>
    </div >
  )
}

