import React, { useState } from 'react'

const NewTaskForm = ({ addTask }) => {
  const initialTask = {
    description: '',
    mins: '',
    secs: '',
  }
  const [task, setTask] = useState(initialTask)
  const { description, mins, secs } = task

  const useHandleTask = (prop, value) => {
    setTask((task) => {
      return { ...task, [prop]: value }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const parsedMins = parseInt(mins, 10) || 0
    const parsedSecs = parseInt(secs, 10) || 0

    if (description.trim()) {
      addTask({
        description: description.trim(),
        mins: parsedMins,
        secs: parsedSecs,
      })
      setTask(initialTask)
    }
  }

  return (
    <form className="new-todo-form" onSubmit={(event) => handleSubmit(event)}>
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        value={description}
        onChange={({ target }) => useHandleTask('description', target.value)}
        required
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Min"
        value={mins}
        onChange={({ target }) => useHandleTask('mins', target.value)}
        // required
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={secs}
        onChange={({ target }) => useHandleTask('secs', target.value)}
        // required
      />
      <button style={{ display: 'none' }}></button>
    </form>
  )
}

export default NewTaskForm
