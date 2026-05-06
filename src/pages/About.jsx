function About() {
  return (
    <section>
      <div className="page-header">
        <h2>About</h2>
        <p>Frontend-only team bug tracker with LocalStorage authentication and role permissions.</p>
      </div>

      <div className="panel-card">
        <h3>Application Highlights</h3>
        <ul className="list-clean">
          <li>LocalStorage demo login with Leader and Developer roles.</li>
          <li>Role-based project and task permissions.</li>
          <li>Task assignment to developers and status workflow tracking.</li>
          <li>Team insights with assigned/completed task metrics.</li>
          <li>Protected routes without any backend.</li>
        </ul>
      </div>
    </section>
  );
}

export default About;
