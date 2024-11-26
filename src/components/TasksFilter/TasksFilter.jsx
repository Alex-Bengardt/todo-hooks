import React from 'react'

const TasksFilter = ({ activeFilter, setFilter }) => {
  return (
    <div className="filters">
      <label className={activeFilter === 'all' ? 'selected' : null}>
        <input className="radiobutton" type="radio" name="filter" value="all" onChange={() => setFilter('all')} />
        All
      </label>
      <label className={activeFilter === 'active' ? 'selected' : null}>
        <input className="radiobutton" type="radio" name="filter" value="active" onChange={() => setFilter('active')} />
        Active
      </label>
      <label className={activeFilter === 'completed' ? 'selected' : null}>
        <input
          className="radiobutton"
          type="radio"
          name="filter"
          value="completed"
          onChange={() => setFilter('completed')}
        />
        Completed
      </label>
    </div>
  )
}

export default TasksFilter
