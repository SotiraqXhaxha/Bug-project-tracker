import { useState } from 'react';

function LoginForm({ onLogin, error }) {
  // State e formes
  const [email, setEmail] = useState('leader@bugtracker.com');
  const [password, setPassword] = useState('leader123');

  // Submit i login-it
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email.trim(), password);
  };

  return (
    <form className="form-card login-card" onSubmit={handleSubmit}>
      <div className="login-card-head">
        <img className="login-logo-image" src="/images/login-logo.png" alt="Bug Project Tracker Logo" />
        <div>
          <h2>Bug Project Tracker</h2>
          <p className="muted">Team access portal</p>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button className="btn btn-primary" type="submit">Sign In</button>

      <div className="demo-accounts">
        <h3>Demo Accounts</h3>
        <div className="demo-grid">
          <article className="demo-card">
            <p className="demo-role">Leader</p>
            <p>leader@bugtracker.com</p>
            <p>leader123</p>
          </article>
          <article className="demo-card">
            <p className="demo-role">Developer</p>
            <p>dev1@bugtracker.com</p>
            <p>dev123</p>
          </article>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
