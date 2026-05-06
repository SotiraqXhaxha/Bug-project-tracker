const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';
const PROJECTS_KEY = 'projects';
const TASKS_KEY = 'tasks';

const demoUsers = [
  {
    id: 'leader-1',
    email: 'leader@bugtracker.com',
    password: 'leader123',
    role: 'Leader',
    name: 'Team Leader',
  },
  {
    id: 'dev-1',
    email: 'dev1@bugtracker.com',
    password: 'dev123',
    role: 'Developer',
    name: 'Developer One',
  },
  {
    id: 'dev-2',
    email: 'dev2@bugtracker.com',
    password: 'dev123',
    role: 'Developer',
    name: 'Developer Two',
  },
  {
    id: 'dev-3',
    email: 'dev3@bugtracker.com',
    password: 'dev123',
    role: 'Developer',
    name: 'Developer Three',
  },
  {
    id: 'dev-4',
    email: 'dev4@bugtracker.com',
    password: 'dev123',
    role: 'Developer',
    name: 'Developer Four',
  },
];

const parseData = (value) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const initializeUsers = () => {
  const existing = parseData(localStorage.getItem(USERS_KEY));
  if (!Array.isArray(existing) || existing.length === 0) {
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
    return demoUsers;
  }
  return existing;
};

export const loadUsers = () => {
  const parsed = parseData(localStorage.getItem(USERS_KEY));
  return Array.isArray(parsed) ? parsed : [];
};

export const loadCurrentUser = () => {
  const parsed = parseData(localStorage.getItem(CURRENT_USER_KEY));
  return parsed && parsed.id ? parsed : null;
};

export const saveCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const loadProjects = () => {
  const parsed = parseData(localStorage.getItem(PROJECTS_KEY));
  return Array.isArray(parsed) ? parsed : [];
};

export const saveProjects = (projects) => {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const loadTasks = () => {
  const parsed = parseData(localStorage.getItem(TASKS_KEY));
  return Array.isArray(parsed) ? parsed : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
