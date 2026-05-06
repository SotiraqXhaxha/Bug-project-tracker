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
  // Parse i sigurt JSON
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const initializeUsers = () => {
  // Vendos userat demo
  const existing = parseData(localStorage.getItem(USERS_KEY));
  if (!Array.isArray(existing) || existing.length === 0) {
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
    return demoUsers;
  }
  return existing;
};

export const loadUsers = () => {
  // Merr userat nga storage
  const parsed = parseData(localStorage.getItem(USERS_KEY));
  return Array.isArray(parsed) ? parsed : [];
};

export const saveUsers = (users) => {
  // Ruan userat ne storage
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loadCurrentUser = () => {
  // Merr userin aktiv
  const parsed = parseData(localStorage.getItem(CURRENT_USER_KEY));
  return parsed && parsed.id ? parsed : null;
};

export const saveCurrentUser = (user) => {
  // Ruan userin aktiv
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  // Fshin userin aktiv
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const loadProjects = () => {
  // Merr projektet nga storage
  const parsed = parseData(localStorage.getItem(PROJECTS_KEY));
  return Array.isArray(parsed) ? parsed : [];
};

export const saveProjects = (projects) => {
  // Ruan projektet ne storage
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const loadTasks = () => {
  // Merr tasket nga storage
  const parsed = parseData(localStorage.getItem(TASKS_KEY));
  return Array.isArray(parsed) ? parsed : [];
};

export const saveTasks = (tasks) => {
  // Ruan tasket ne storage
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
