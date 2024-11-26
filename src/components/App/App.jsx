import React, { useCallback, useEffect, useState } from 'react'
import { add } from 'date-fns'

import NewTaskForm from '../NewTaskForm'
import TasksList from '../TasksList'
import TasksFilter from '../TasksFilter'

const App = () => {
  const LOCAL_STORAGE_KEY = 'tasksList'

  const InitialTasksList = [
    {
      id: '1',
      description: 'First task',
      createdAt: new Date(1694478477337).toISOString(),
      isCompleted: false,
      isEditing: false,
      timer: false,
      timerSecs: 5,
    },
    {
      id: '2',
      description: 'Completed task',
      createdAt: new Date().toISOString(),
      isCompleted: true,
      isEditing: false,
      timer: false,
      timerSecs: 5 * 60 + 25,
    },
    {
      id: '3',
      description: 'Editing task',
      createdAt: new Date().toISOString(),
      isCompleted: false,
      isEditing: true,
      timer: false,
      timerSecs: 15 * 60,
    },
    {
      id: '4',
      description: 'Active task',
      createdAt: new Date().toISOString(),
      timer: false,
      timerSecs: 6 * 60 + 30,
    },
  ]

  const loadTasks = () => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedTasks ? JSON.parse(savedTasks) : InitialTasksList
  }

  const [tasksList, setTasksList] = useState(loadTasks())
  const [activeFilter, setActiveFilter] = useState('all')

  const createTask = (description, mins = 0, secs = 0) => {
    const createdAt = new Date().toISOString()
    const expiredDate = add(new Date(), {
      minutes: parseInt(mins) || 0,
      seconds: parseInt(secs) || 0,
    })
    const timerSecs = parseInt(mins) * 60 + parseInt(secs)

    return {
      id: Date.now().toString(),
      description,
      isCompleted: false,
      isEditing: false,
      createdAt,
      expiredDate,
      timer: false,
      timerSecs,
    }
  }

  const addTask = (task) => {
    const { description, mins = 0, secs = 0 } = task
    setTasksList((tasksList) => [...tasksList, createTask(description, mins, secs)])
  }

  const deleteTask = (id) => {
    setTasksList((tasksList) => tasksList.filter((task) => task.id !== id))
  }

  const findTaskIndex = (id) => tasksList.findIndex((task) => task.id === id)

  const toggleTaskProperty = (id, prop, value = null) => {
    setTasksList((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, [prop]: value !== null ? value : !task[prop] } : task))
    )
  }

  const toggleTaskCompleted = (id) => toggleTaskProperty(id, 'isCompleted')
  const toggleTaskEditing = (id) => toggleTaskProperty(id, 'isEditing')

  const changeTaskText = (id, description) => {
    setTasksList((tasks) => tasks.map((task) => (task.id === id ? { ...task, description } : task)))
  }

  const filterTaskList = (tasks, filter) => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.isCompleted)
      case 'completed':
        return tasks.filter((task) => task.isCompleted)
      default:
        return tasks
    }
  }

  const clearCompletedTasks = () => {
    setTasksList((tasksList) => tasksList.filter((task) => !task.isCompleted))
  }

  const handleSetTimer = (id, boolean) => toggleTaskProperty(id, 'timer', boolean)

  const counting = useCallback(() => {
    setTasksList((tasksList) =>
      tasksList.map((task) => {
        if (task.timer && task.timerSecs > 0) {
          return { ...task, timerSecs: task.timerSecs - 1 }
        } else if (task.timerSecs <= 0) {
          return { ...task, timer: false }
        }
        return task
      })
    )
  }, [])

  const tasksLeft = filterTaskList(tasksList, 'active').length

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksList))
  }, [tasksList])

  useEffect(() => {
    const taskTimer = setInterval(() => counting(), 1000)
    return () => clearInterval(taskTimer)
  }, [counting])

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <main className="main">
        <TasksList
          tasksList={filterTaskList(tasksList, activeFilter)}
          hasNoted={toggleTaskCompleted}
          hasEdit={toggleTaskEditing}
          updateText={changeTaskText}
          deleteTask={deleteTask}
          handleSetTimer={handleSetTimer}
        />
      </main>
      <footer className="footer">
        <span className="todo-count">{tasksLeft} items left</span>
        <TasksFilter activeFilter={activeFilter} setFilter={setActiveFilter} />
        <button className="clear-completed" onClick={clearCompletedTasks}>
          Clear completed
        </button>
      </footer>
    </div>
  )
}

export default App
