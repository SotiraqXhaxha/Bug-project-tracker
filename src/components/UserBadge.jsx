import RoleBadge from './RoleBadge';

function UserBadge({ user }) {
  if (!user) return null;

  return (
    <div className="user-badge">
      <div>
        <strong>{user.name}</strong>
        <p>{user.email}</p>
      </div>
      <RoleBadge role={user.role} />
    </div>
  );
}

export default UserBadge;
