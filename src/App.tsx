import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {

  const todolistId1 = v1()
  const todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ])

  let [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: true },
    ]
  })

  const removeTask = (todolistId: string, taskId: string) => {
    const result = tasks[todolistId].filter((el) => el.id !== taskId)
    tasks[todolistId] = result
    setTasks({ ...tasks })
  }

  const addTask = (todolistId: string, taskTitle: string) => {
    const newTask = {
      id: v1(),
      title: taskTitle,
      isDone: false
    }
    const result = [newTask, ...tasks[todolistId]]
    tasks[todolistId] = result
    setTasks({ ...tasks })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const result = tasks[todolistId].map((el) => el.id === taskId ? { ...el, isDone: isDone } : { ...el })
    tasks[todolistId] = result
    setTasks({ ...tasks })
  }

  const filterTasks = (todolistId: string, filter: FilterValuesType) => {
    const result = todolists.map((el) => el.id === todolistId ? { ...el, filter: filter } : { ...el })
    setTodolists(result)
  }

  const removeTodolist = (todolistId: string) => {
    const result = todolists.filter(el => el.id !== todolistId)
    setTodolists(result)
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  const addTodolist = (title: string) => {
    const todolist: TodolistType = {
      id: v1(),
      title: title,
      filter: 'all'
    }
    setTodolists([todolist, ...todolists])
    setTasks({ [todolist.id]: [], ...tasks })
  }

  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    const result = tasks[todolistId].map(el => el.id === taskId ? { ...el, title: newTitle } : { ...el })
    tasks[todolistId] = result
    setTasks({...tasks})
  }

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    const result = todolists.map(el => el.id === todolistId ? {...el, title: newTitle}: {...el})
    setTodolists(result)
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {
        todolists.map((el) => {

          let filteredTasks = tasks[el.id]
          if (el.filter === 'active') {
            filteredTasks = filteredTasks.filter((el) => el.isDone === false)
          }
          if (el.filter === 'completed') {
            filteredTasks = filteredTasks.filter((el) => el.isDone === true)
          }

          return <Todolist
            key={el.id}
            title={el.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            filterTasks={filterTasks}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={el.filter}
            todolistId={el.id}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        })
      }

    </div>
  );
}

export default App;
