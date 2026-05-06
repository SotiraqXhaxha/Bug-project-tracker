function TaskCard({
  task,
  projectName,
  assigneeName,
  canEdit,
  canDelete,
  canChangeStatus,
  onEdit,
  onDelete,
  onStatusChange,
  compact = false,
}) {
  const priorityClass =
    task.priority === 'High'
      ? 'priority-high'
      : task.priority === 'Medium'
      ? 'priority-medium'
      : 'priority-low';

  const statusClass =
    task.status === 'Done'
      ? 'status-done'
      : task.status === 'In Progress'
      ? 'status-progress'
      : 'status-todo';

  return (
    <article className="entity-card task-card">
      <div className="entity-card-header">
        <h3>{task.title}</h3>
        <div className="badge-row">
          <span className={`badge ${priorityClass}`}>{task.priority}</span>
          <span className={`badge ${statusClass}`}>{task.status}</span>
        </div>
      </div>

      <p className="entity-meta">Project: {projectName || 'Unknown project'}</p>
      <p className="entity-meta">Assigned: {assigneeName || 'Unknown user'}</p>
      <p className="entity-description">{task.description || 'No details provided.'}</p>

      <div className="entity-actions">
        {!compact && canEdit && (
          <button className="btn btn-secondary" onClick={() => onEdit(task)}>
            Edit
          </button>
        )}

        {!compact && canDelete && (
          <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        )}

        {canChangeStatus && (
          <select
            className="status-select"
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        )}
      </div>
    </article>
  );
}

export default TaskCard;
