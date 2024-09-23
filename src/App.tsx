import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TasksType, Todolist } from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ])

  let [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((el) => el.id !== taskId))
  }

  const addTask = (taskTitle: string) => {
    const newTask = {
      id: v1(),
      title: taskTitle,
      isDone: false
    }
    setTasks([newTask, ...tasks])
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map((el) => (el.id === taskId) ? { ...el, isDone: isDone } : { ...el }))
  }


  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter((el) => el.isDone === false)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter((el) => el.isDone === true)
  }

  const filterTasks = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  return (
    <div className="App">
      <Todolist
        title='What to learn'
        tasks={filteredTasks}
        removeTask={removeTask}
        filterTasks={filterTasks}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
