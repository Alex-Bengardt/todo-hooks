import React from 'react'

import Task from '../Task'

const TasksList = ({ tasksList, hasNoted, hasEdit, updateText, deleteTask, handleSetTimer }) => {
  const confirmTaskEdit = (event, id) => {
    event.preventDefault()
    hasEdit(id)
  }

  const handleTaskText = (text, id) => {
    updateText(id, text)
  }

  const renderedTasksList = tasksList.map((task) => {
    const { id, description, isCompleted, isEditing } = task

    return (
      <li key={id} className={isEditing ? 'editing' : isCompleted ? 'completed' : null}>
        <Task
          task={task}
          hasNoted={hasNoted}
          hasEdit={hasEdit}
          deleteTask={deleteTask}
          handleSetTimer={handleSetTimer}
        />
        {isEditing ? (
          <form onSubmit={(event) => confirmTaskEdit(event, id)}>
            <input
              type="text"
              className="edit"
              autoFocus
              value={description || ''}
              onChange={({ target }) => handleTaskText(target.value, id)}
              required
            ></input>
            <button style={{ display: 'none' }}></button>
          </form>
        ) : null}
      </li>
    )
  })

  return <ul className="todo-list">{renderedTasksList}</ul>
}

export default TasksList
