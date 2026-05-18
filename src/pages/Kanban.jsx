import { useMemo } from 'react';
import TaskCard from '../components/TaskCard';

const columns = ['To Do', 'In Progress', 'Done'];

function Kanban({ projects, tasks, users, setTasks, currentUser }) {
  // Kontrollon rolin e userit
  const isLeader = currentUser.role === 'Leader';

  const projectMap = useMemo(
    () => projects.reduce((acc, project) => ({ ...acc, [project.id]: project.name }), {}),
    [projects]
  );

  const userMap = useMemo(
    () => users.reduce((acc, user) => ({ ...acc, [user.id]: user.name }), {}),
    [users]
  );

  // Shfaq tasket sipas rolit
  const visibleTasks = isLeader
    ? tasks
    : tasks.filter((task) => task.assignedTo === currentUser.id);

  // Grupon tasket me status
  const groupedTasks = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column] = visibleTasks.filter((task) => task.status === column);
      return acc;
    }, {});
  }, [visibleTasks]);

  // Ndryshon statusin e taskut
  const handleStatusChange = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        // Kufizim sipas rolit
        if (!isLeader && task.assignedTo !== currentUser.id) return task;
        return { ...task, status: nextStatus };
      })
    );
  };

  return (
    <section>
      <div className="page-header">

        <h2>Kanban Board</h2>
        <p>{isLeader ? 'All team tasks by status.' : 'Your assigned tasks by status.'}</p>
      </div>

      <div className="kanban-grid">
        {columns.map((column) => (
          <div key={column} className="kanban-column">
            <div className="kanban-column-header">
              <h3>{column}</h3>
              <span>{groupedTasks[column].length}</span>
            </div>

            <div className="kanban-column-body">
              {groupedTasks[column].length === 0 && <div className="empty-state">No tasks in this column.</div>}
              {groupedTasks[column].map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  projectName={projectMap[task.projectId]}
                  assigneeName={userMap[task.assignedTo]}
                  canEdit={false}
                  canDelete={false}
                  canChangeStatus
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onStatusChange={handleStatusChange}
                  compact
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Kanban;
