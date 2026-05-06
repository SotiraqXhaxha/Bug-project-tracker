import RoleBadge from './RoleBadge';

function TeamMemberCard({ member, assignedCount, completedCount }) {
  return (
    <article className="entity-card">
      <div className="entity-card-header">
        <h3>{member.name}</h3>
        <RoleBadge role={member.role} />
      </div>
      <p className="entity-meta">{member.email}</p>
      <div className="progress-row">
        <span>Assigned Tasks</span>
        <strong>{assignedCount}</strong>
      </div>
      <div className="progress-row">
        <span>Completed Tasks</span>
        <strong>{completedCount}</strong>
      </div>
    </article>
  );
}

export default TeamMemberCard;
