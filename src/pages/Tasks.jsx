import { useMemo, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

function Tasks({ projects, tasks, users, setTasks, currentUser }) {
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const isLeader = currentUser.role === 'Leader';

  const developers = users.filter((user) => user.role === 'Developer');

  const projectMap = useMemo(
    () => projects.reduce((acc, project) => ({ ...acc, [project.id]: project.name }), {}),
    [projects]
  );

  const userMap = useMemo(
    () => users.reduce((acc, user) => ({ ...acc, [user.id]: user.name }), {}),
    [users]
  );

  const handleSubmitTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== editingTask.id) return task;

          // Role-based edit permissions on task update.
          if (isLeader) {
            return {
              ...task,
              ...taskData,
            };
          }

          if (task.assignedTo !== currentUser.id) {
            return task;
          }

          return {
            ...task,
            description: taskData.description,
            status: taskData.status,
          };
        })
      );
      setEditingTask(null);
      return;
    }

    if (!isLeader) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      projectId: taskData.projectId,
      priority: taskData.priority,
      status: taskData.status,
      assignedTo: taskData.assignedTo,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (taskId) => {
    if (!isLeader) return;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    if (editingTask?.id === taskId) setEditingTask(null);
  };

  const handleStatusChange = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        // Leader can move any task. Developer can move only own tasks.
        if (!isLeader && task.assignedTo !== currentUser.id) {
          return task;
        }

        return { ...task, status: nextStatus };
      })
    );
  };

  const visibleTasks = isLeader
    ? tasks
    : tasks.filter((task) => task.assignedTo === currentUser.id);

  const filteredTasks = visibleTasks.filter((task) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      (projectMap[task.projectId] || '').toLowerCase().includes(query) ||
      (userMap[task.assignedTo] || '').toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesQuery && matchesStatus && matchesPriority;
  });

  return (
    <section>
      <div className="page-header">
        <h2>Tasks</h2>
        <p>{isLeader ? 'Create, assign and manage all team tasks.' : 'View and update your assigned tasks.'}</p>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state large">Create at least one project before adding tasks.</div>
      ) : (
        <div className="panel-grid two-columns">
          {isLeader || editingTask ? (
            <TaskForm
              projects={projects}
              developers={developers}
              onSubmit={handleSubmitTask}
              editingTask={editingTask}
              onCancel={() => setEditingTask(null)}
              currentUser={currentUser}
              isLeader={isLeader}
            />
          ) : (
            <article className="panel-card">
              <h3>Developer Access</h3>
              <p className="muted">You can edit description/status by clicking Edit on your task card.</p>
            </article>
          )}

          <div>
            <div className="filters-row">
              <input
                placeholder="Search tasks, project or assignee"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="All">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="cards-grid">
              {filteredTasks.length === 0 && <div className="empty-state">No tasks match your filters.</div>}

              {filteredTasks.map((task) => {
                const ownsTask = task.assignedTo === currentUser.id;
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    projectName={projectMap[task.projectId]}
                    assigneeName={userMap[task.assignedTo]}
                    canEdit={isLeader || ownsTask}
                    canDelete={isLeader}
                    canChangeStatus={isLeader || ownsTask}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Tasks;
