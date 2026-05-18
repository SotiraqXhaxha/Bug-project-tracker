import { useMemo } from 'react';
import StatsCard from '../components/StatsCard';

function Dashboard({ projects, tasks, users, currentUser }) {
  // Kontrollon rolin e userit
  const isLeader = currentUser.role === 'Leader';

  // Shfaq tasket sipas rolit
  const visibleTasks = isLeader
    ? tasks
    : tasks.filter((task) => task.assignedTo === currentUser.id);

  // Statistikat kryesore
  const todoCount = visibleTasks.filter((task) => task.status === 'To Do').length;

  const progressCount = visibleTasks.filter((task) => task.status === 'In Progress').length;
  const doneCount = visibleTasks.filter((task) => task.status === 'Done').length;

  // Numron tasket per developer
  const tasksByDeveloper = useMemo(() => {
    const developers = users.filter((user) => user.role === 'Developer');
    return developers.map((dev) => ({
      id: dev.id,
      name: dev.name,
      count: tasks.filter((task) => task.assignedTo === dev.id).length,
    }));
  }, [tasks, users]);

  return (
    <section>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>{isLeader ? 'Whole team overview and delivery metrics.' : 'Your assigned work overview.'}</p>
      </div>

      <div className="stats-grid">
        <StatsCard title="Total Projects" value={projects.length} accent="accent-blue" />
        <StatsCard title={isLeader ? 'Total Tasks' : 'My Tasks'} value={visibleTasks.length} accent="accent-teal" />
        <StatsCard title="To Do" value={todoCount} accent="accent-indigo" />
        <StatsCard title="In Progress" value={progressCount} accent="accent-orange" />
        <StatsCard title="Completed" value={doneCount} accent="accent-green" />
      </div>

      <div className="panel-grid two-columns">
        <article className="panel-card">
          <h3>Status Breakdown</h3>
          <div className="progress-row"><span>To Do</span><strong>{todoCount}</strong></div>
          <div className="progress-row"><span>In Progress</span><strong>{progressCount}</strong></div>
          <div className="progress-row"><span>Done</span><strong>{doneCount}</strong></div>
        </article>

        {isLeader ? (
          <article className="panel-card">
            <h3>Tasks By Developer</h3>
            {tasksByDeveloper.map((item) => (
              <div className="progress-row" key={item.id}>
                <span>{item.name}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </article>
        ) : (
          <article className="panel-card">
            <h3>Personal Focus</h3>
            <ul className="list-clean">
              <li>Keep status updated as work progresses.</li>
              <li>Resolve high-priority bugs first.</li>
              <li>Document clear task descriptions.</li>
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
