function ProjectCard({ project, taskCount, onEdit, onDelete, canManage }) {
  return (
    <article className="entity-card">
      <div className="entity-card-header">
        <h3>{project.name}</h3>
        <div className="badge-row">
          <span className="badge neutral">{taskCount} tasks</span>
          <span className="badge status-progress">{project.status}</span>
        </div>
      </div>

      <p className="entity-description">{project.description || 'No description added.'}</p>

      {canManage && (
        <div className="entity-actions">
          <button className="btn btn-secondary" onClick={() => onEdit(project)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(project.id)}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default ProjectCard;
