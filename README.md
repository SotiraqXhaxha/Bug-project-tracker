# Bug Project Tracker

Bug Project Tracker is a frontend-only React application built with Vite. It provides a mini Jira/Trello-style workflow for a 5-person team with role-based access using LocalStorage only.

## Technologies

- React + JavaScript
- Vite
- React Router DOM
- Plain CSS (responsive dark/light dashboard)
- LocalStorage persistence (no backend)

## Demo Accounts

Leader:
- Email: `leader@bugtracker.com`
- Password: `leader123`
- Role: `Leader`

Developers:
- `dev1@bugtracker.com` / `dev123` / `Developer One`
- `dev2@bugtracker.com` / `dev123` / `Developer Two`
- `dev3@bugtracker.com` / `dev123` / `Developer Three`
- `dev4@bugtracker.com` / `dev123` / `Developer Four`

## Role Permissions

Leader can:
- Create, edit, delete projects
- Create tasks and assign to developers
- Edit/delete any task
- Change status for any task
- View all projects/tasks and full dashboard stats

Developer can:
- View projects
- View only assigned tasks
- Change status of own tasks
- Edit only own task description/status
- Cannot create/delete projects
- Cannot assign tasks to others
- Cannot delete tasks

## Features

- Login + protected routes using LocalStorage
- Dashboard with role-aware statistics
- Full project management (Leader)
- Task/bug tracking with priority and status badges
- Kanban board grouped by status
- Team page with assignment/completion metrics
- Search/filter tasks
- Dark/Light theme toggle

## LocalStorage Keys

- `users`
- `currentUser`
- `projects`
- `tasks`

## Installation and Run

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal.

## Routes

- `/login`
- `/dashboard`
- `/projects`
- `/tasks`
- `/kanban`
- `/team`
- `/about`
