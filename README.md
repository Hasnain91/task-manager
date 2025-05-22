# 📝 Task Management Web App

A full-stack Task Management app built with **React**, **Redux**, **Express**, **MongoDB**, and **Tailwind CSS**. Users can create, update, delete, and manage tasks, with real-time search and dynamic status handling.

---

## Features

- Create tasks with title, description, deadline, and status
- Edit or delete existing tasks
- Move tasks between "To Do", "In Progress", and "Done" columns
- Search tasks by title or description (with highlighted matches)
- Toast notifications for success/error feedback
- Automatically flag overdue tasks
- Responsive layout using Tailwind CSS

---

## Folder Structure

root/
├── backend/ # Express backend
│ ├── controllers/ # Task controller logic
│ ├── models/ # Task schema
│ ├── routes/ # Task API routes
│ ├── config/ # DB connection
│ └── server.js
├── frontend/ # React frontend
│ ├── public
│ ├── src
| ├── components/ # TaskCard, TaskBoard, Modals etc
│ ├── features/ # Redux slices
│ ├── utils/ # highlightSearchTerm.js
│ ├── pages/ # Home.jsx
│ ├── App.jsx
│ └── main.jsx
├── .gitignore
└── README.md

---

## Setup Instructions

### Backend (Node.js + Express)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:
   npm install

3. Create a .env file with:
   MONGO_URI=<your_mongodb_connection_string>
   PORT=5000

4. Start the backend:
   npm run dev

### Frontend (React + Redux + Tailwind)

1. Navigate to the frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Start the frontend:
   npm run dev

## Logic & Functionality

- Tasks are stored in MongoDB and retrieved using Redux.
- Tasks are grouped by status and sorted by most recent updates.
- Search filters tasks in real-time and highlights matches in both title and description.
- Prevents duplicate task titles within the same status category.
- All modals (create/edit/delete) are built with controlled states.

## Bonus Features

- Real-time search with highlighted search terms
- Toast notification for success/error messages
- Overdue task indicator
- Sleek, responsive UI using Tailwind CSS
- Clean and minimal modal design for task actions

## Loom Link

- https://www.loom.com/share/4e9508822e024a8183e1e615c4da3450?sid=a4c91e57-42e2-4ef4-b753-d1a9fcbc1144

## Author

Hasnain Iftikhar
Email: hasnainiftikhar.rao@gmail.com
GitHub Profile: https://github.com/Hasnain91
