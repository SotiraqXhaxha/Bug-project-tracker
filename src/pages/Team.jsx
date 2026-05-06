import TeamMemberCard from '../components/TeamMemberCard';

function Team({ users, tasks }) {
  return (
    <section>
      <div className="page-header">
        <h2>Team</h2>
        <p>All project users with role and task progress statistics.</p>
      </div>

      <div className="cards-grid">
        {users.map((member) => {
          const assigned = tasks.filter((task) => task.assignedTo === member.id).length;
          const completed = tasks.filter(
            (task) => task.assignedTo === member.id && task.status === 'Done'
          ).length;

          return (
            <TeamMemberCard
              key={member.id}
              member={member}
              assignedCount={assigned}
              completedCount={completed}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Team;
