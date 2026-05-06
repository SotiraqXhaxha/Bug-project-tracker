import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Login({ users, currentUser, onLogin }) {
  // Gabim autentikimi
  const [error, setError] = useState('');

  // Aktivizon full-screen login
  useEffect(() => {
    document.body.classList.add('login-screen');
    return () => document.body.classList.remove('login-screen');
  }, []);

  // Nese eshte login
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  // Verifikon kredencialet
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
      <div className="login-left-panel">
        <div className="login-left-content">
          <div className="login-left-brand">
            <h1>BUG TRACKER PRO</h1>
            <p>Menaxho bug-et dhe projektet ne menyre inteligjente.</p>
          </div>
        </div>
      </div>

      <div className="login-right-panel">
        <LoginForm onLogin={handleLogin} error={error} />
      </div>
    </section>
  );
}

export default Login;
