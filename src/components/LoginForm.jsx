import { useState } from 'react';

function LoginForm({ onLogin, error }) {
  const [email, setEmail] = useState('leader@bugtracker.com');
  const [password, setPassword] = useState('leader123');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email.trim(), password);
  };

  return (
    <form className="form-card login-card" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p className="muted">Use one of the demo team accounts to continue.</p>

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

      <button className="btn btn-primary" type="submit">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
