import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Kanban from './pages/Kanban';
import Team from './pages/Team';
import About from './pages/About';
import Login from './pages/Login';
import {
  clearCurrentUser,
  initializeUsers,
  loadCurrentUser,
  loadProjects,
  loadTasks,
  loadUsers,
  saveCurrentUser,
  saveProjects,
  saveTasks,
} from './utils/localStorage';

function AppShell() {
  const [theme, setTheme] = useState('dark');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('bpt_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);

    initializeUsers();
    setUsers(loadUsers());
    setCurrentUser(loadCurrentUser());
    setProjects(loadProjects());
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    localStorage.setItem('bpt_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogin = (user) => {
    saveCurrentUser(user);
    setCurrentUser(user);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <div className="app-shell">
      {currentUser && (
        <Navbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      <main className="app-main">
        <Routes>
          <Route
            path="/login"
            element={<Login users={users} currentUser={currentUser} onLogin={handleLogin} />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Dashboard
                  projects={projects}
                  tasks={tasks}
                  users={users}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Projects
                  projects={projects}
                  tasks={tasks}
                  setProjects={setProjects}
                  setTasks={setTasks}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Tasks
                  projects={projects}
                  tasks={tasks}
                  users={users}
                  setTasks={setTasks}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kanban"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Kanban
                  projects={projects}
                  tasks={tasks}
                  users={users}
                  setTasks={setTasks}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/team"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Team users={users} tasks={tasks} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={currentUser ? '/dashboard' : '/login'} replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
