import { useEffect, useState } from 'react';

const emptyProject = { name: '', description: '', status: 'Active' };

function ProjectForm({ onSubmit, editingProject, onCancel }) {
  // State e formes
  const [formData, setFormData] = useState(emptyProject);

  // Mbush formen ne edit
  useEffect(() => {
    if (editingProject) {
      setFormData({
        name: editingProject.name,
        description: editingProject.description,
        status: editingProject.status,
      });
      return;
    }

    setFormData(emptyProject);
  }, [editingProject]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit i projektit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name.trim()) return;

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
    });

    if (!editingProject) setFormData(emptyProject);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{editingProject ? 'Edit Project' : 'Create Project'}</h2>
      <div className="form-group">
        <label htmlFor="project-name">Project Name</label>
        <input id="project-name" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-status">Status</label>
        <select id="project-status" name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Paused">Paused</option>
        </select>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          {editingProject ? 'Update Project' : 'Add Project'}
        </button>
        {editingProject && (
          <button className="btn btn-ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
