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
import Profile from './pages/Profile';
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
  saveUsers,
} from './utils/localStorage';

function AppShell() {
  // State kryesore te app
  const [theme, setTheme] = useState('dark');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Ngarkim fillestar nga storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('bpt_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);

    initializeUsers();
    setUsers(loadUsers());
    setCurrentUser(loadCurrentUser());
    setProjects(loadProjects());
    setTasks(loadTasks());
  }, []);

  // Ruan temen aktive
  useEffect(() => {
    localStorage.setItem('bpt_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Ruajtje e projekteve
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  // Ruajtje e taskeve
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Login dhe redirect
  const handleLogin = (user) => {
    saveCurrentUser(user);
    setCurrentUser(user);
    navigate('/dashboard');
  };

  // Logout dhe pastrim
  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    navigate('/login');
  };

  // Perditeson emrin e profilit
  const handleProfileNameSave = (nextName) => {
    if (!currentUser) return;

    const trimmedName = nextName.trim();
    if (!trimmedName) return;

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? { ...user, name: trimmedName } : user
    );

    const updatedCurrentUser = { ...currentUser, name: trimmedName };

    setUsers(updatedUsers);
    setCurrentUser(updatedCurrentUser);
    saveUsers(updatedUsers);
    saveCurrentUser(updatedCurrentUser);
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
        {/* Seksioni i rrugeve */}
        <Routes>
          <Route
            path="/login"
            element={<Login users={users} currentUser={currentUser} onLogin={handleLogin} />}
          />

          <Route
            path="/dashboard"
            element={
              // Mbrojtje route me user
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
              // Mbrojtje route me user
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
              // Mbrojtje route me user
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
              // Mbrojtje route me user
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
              // Mbrojtje route me user
              <ProtectedRoute currentUser={currentUser}>
                <Team users={users} tasks={tasks} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              // Mbrojtje route me user
              <ProtectedRoute currentUser={currentUser}>
                <Profile
                  currentUser={currentUser}
                  onSaveName={handleProfileNameSave}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              // Mbrojtje route me user
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
