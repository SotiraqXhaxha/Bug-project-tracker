import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Login({ users, currentUser, onLogin }) {
  const [error, setError] = useState('');

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = (email, password) => {
    const match = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (!match) {
      setError('Invalid email or password.');
      return;
    }

    setError('');
    onLogin(match);
  };

  return (
    <section className="login-page">
      <div className="page-header">
        <h2>Welcome to Bug Project Tracker</h2>
        <p>Sign in with a demo account to continue.</p>
      </div>
      <LoginForm onLogin={handleLogin} error={error} />
    </section>
  );
}

export default Login;
