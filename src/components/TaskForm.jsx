import { useEffect, useState } from 'react';

const buildDefaultTask = (projects, developers) => ({
  title: '',
  description: '',
  projectId: projects[0]?.id || '',
  priority: 'Medium',
  status: 'To Do',
  assignedTo: developers[0]?.id || '',
});

function TaskForm({
  projects,
  developers,
  onSubmit,
  editingTask,
  onCancel,
  currentUser,
  isLeader,
}) {
  // State e formes
  const [formData, setFormData] = useState(buildDefaultTask(projects, developers));

  // Mbush formen ne edit
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        projectId: editingTask.projectId,
        priority: editingTask.priority,
        status: editingTask.status,
        assignedTo: editingTask.assignedTo,
      });
      return;
    }

    setFormData(buildDefaultTask(projects, developers));
  }, [editingTask, projects, developers]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit i taskut
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.projectId || !formData.assignedTo) return;

    // Kufizim sipas rolit
    if (!isLeader && editingTask) {
      onSubmit({
        description: formData.description.trim(),
        status: formData.status,
      });
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      projectId: formData.projectId,
      priority: formData.priority,
      status: formData.status,
      assignedTo: formData.assignedTo,
    });

    if (!editingTask) {
      setFormData(buildDefaultTask(projects, developers));
    }
  };

  // Kontrollon pronarin e taskut
  const isDeveloperEditingOwnTask =
    !isLeader && editingTask && editingTask.assignedTo === currentUser.id;

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Edit Task / Bug' : 'Create Task / Bug'}</h2>

      <div className="form-group">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={!isLeader}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          disabled={!isLeader && !isDeveloperEditingOwnTask}
        />
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="task-project">Project</label>
          <select
            id="task-project"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            disabled={!isLeader}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={!isLeader}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={!isLeader && !isDeveloperEditingOwnTask}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-assigned">Assign To</label>
          <select
            id="task-assigned"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            disabled={!isLeader}
          >
            {developers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={projects.length === 0 || developers.length === 0}
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button className="btn btn-ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
