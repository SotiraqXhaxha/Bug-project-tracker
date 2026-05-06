function RoleBadge({ role }) {
  const roleClass = role === 'Leader' ? 'role-leader' : 'role-developer';
  return <span className={`badge ${roleClass}`}>{role}</span>;
}

export default RoleBadge;
