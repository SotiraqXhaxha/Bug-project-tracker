import { Navigate } from 'react-router-dom';

function ProtectedRoute({ currentUser, children }) {
  // Kontrollon autentikimin
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Lejon hyrjen ne route
  return children;
}

export default ProtectedRoute;
