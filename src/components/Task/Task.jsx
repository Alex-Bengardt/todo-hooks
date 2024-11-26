import { formatDistanceToNow, parseJSON } from 'date-fns'

const Task = ({ task, hasNoted, hasEdit, deleteTask, handleSetTimer }) => {
  const { description, id, isCompleted, createdAt, timerSecs } = task

  const renderTimer = (delta) => {
    const mins = Math.floor(delta / 60)
    const secs = delta % 60

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        defaultChecked={isCompleted ? true : null}
        onClick={() => hasNoted(id)}
      ></input>
      <label>
        <span className="title">{description}</span>
        <span className="description">
          <button className="icon icon-play" onClick={() => handleSetTimer(id, true)}></button>
          <button className="icon icon-pause" onClick={() => handleSetTimer(id, false)}></button>
          <span className="counter">{renderTimer(timerSecs)}</span>
        </span>
        <span className="created">{formatDistanceToNow(parseJSON(createdAt))}</span>
      </label>
      <button className="icon icon-edit" onClick={() => hasEdit(id)}></button>
      <button className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
    </div>
  )
}

export default Task
