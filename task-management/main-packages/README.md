# Modern Task Management System

A full-stack web application for managing tasks with a modern and responsive user interface.

## Features

- 📱 Responsive design using Bootstrap and modern CSS
- ⚛️ React components with hooks and functional components
- 🔄 Redux for state management
- 🛣️ React Router for navigation
- 🔒 Secure backend with Node.js and Express
- 🗄️ MongoDB database with Mongoose ODM
- ✨ Modern UI with animations and transitions

## Tech Stack

### Frontend
- React 18
- Redux Toolkit
- React Router v6
- Bootstrap 5
- Axios
- React Icons
- Framer Motion (for animations)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development servers:
   ```bash
   npm start
   ```

## Project Structure

```
task-management-system/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # Redux store and slices
│   │   ├── services/     # API services
│   │   └── styles/       # CSS and SCSS files
│   └── public/           # Static files
└── backend/              # Node.js backend
    ├── controllers/      # Route controllers
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    └── middleware/      # Custom middleware
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 