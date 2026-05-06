import { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';

function Projects({ projects, tasks, setProjects, setTasks, currentUser }) {
  // State per editim
  const [editingProject, setEditingProject] = useState(null);
  // Kontrollon rolin e userit
  const isLeader = currentUser.role === 'Leader';

  // Krijon ose perditeson projekt
  const handleSubmitProject = (projectData) => {
    if (!isLeader) return;

    if (editingProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id ? { ...project, ...projectData } : project
        )
      );
      setEditingProject(null);
      return;
    }

    const newProject = {
      id: crypto.randomUUID(),
      name: projectData.name,
      description: projectData.description,
      status: projectData.status,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [newProject, ...prev]);
  };

  // Fshin projekt dhe taske
  const handleDeleteProject = (projectId) => {
    if (!isLeader) return;

    setProjects((prev) => prev.filter((project) => project.id !== projectId));
    setTasks((prev) => prev.filter((task) => task.projectId !== projectId));

    if (editingProject?.id === projectId) setEditingProject(null);
  };

  return (
    <section>
      <div className="page-header">
        <h2>Projects</h2>
        <p>{isLeader ? 'Create and manage team projects.' : 'View active projects and context.'}</p>
      </div>

      <div className="panel-grid two-columns">
        {isLeader ? (
          <ProjectForm
            onSubmit={handleSubmitProject}
            editingProject={editingProject}
            onCancel={() => setEditingProject(null)}
          />
        ) : (
          <article className="panel-card">
            <h3>Developer Access</h3>
            <p className="muted">Project management actions are available only to the Leader role.</p>
          </article>
        )}

        <div className="cards-grid">
          {projects.length === 0 && <div className="empty-state">No projects yet.</div>}
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              taskCount={tasks.filter((task) => task.projectId === project.id).length}
              onEdit={setEditingProject}
              onDelete={handleDeleteProject}
              canManage={isLeader}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
