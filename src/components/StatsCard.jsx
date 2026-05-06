function StatsCard({ title, value, accent = 'default' }) {
  return (
    <article className={`stats-card ${accent}`}>
      <p className="stats-label">{title}</p>
      <h3 className="stats-value">{value}</h3>
    </article>
  );
}

export default StatsCard;
