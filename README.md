# Notes App - MERN Stack Implementation

## Project Overview
A full-stack note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. This project demonstrates the implementation of a secure, user-friendly note-taking system with authentication and CRUD operations.

## Features
- 🔐 Secure user authentication
- 📝 Create, read, update, and delete notes
- 🎨 Modern, responsive design using Tailwind CSS
- ✨ Input validation and error handling
- 🚀 Fast development setup with Vite

## Development Process & Learnings

### Challenges Faced
1. **Authentication Implementation**
   - Implemented JWT-based authentication
   - Learned about secure password hashing with bcrypt
   - Gained experience in maintaining user sessions

2. **Frontend-Backend Integration**
   - Managed state effectively using React hooks
   - Implemented error handling for API requests
   - Learned about cross-origin resource sharing (CORS)

3. **Database Design**
   - Designed efficient MongoDB schemas
   - Implemented relationships between users and notes
   - Learned about MongoDB indexing for better performance

### Key Learnings
- Importance of proper project structure in full-stack applications
- Best practices for securing user data and API endpoints
- Effective error handling strategies across the stack
- Value of comprehensive documentation
- TypeScript integration benefits in React applications

## Technical Implementation

### Backend Architecture
- Express.js server with modular routing
- MongoDB connection with Mongoose ODM
- JWT middleware for route protection
- Request validation using express-validator

### Frontend Design
- React components with TypeScript
- Responsive design with Tailwind CSS
- TanStack Query for efficient data fetching
- Protected routes with React Router

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation Steps
1. Clone the repository
   ```bash
   git clone [repository-url]
   cd notes-app
   ```

2. Install dependencies
   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

3. Environment Setup
   ```bash
   # Server (.env)
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/notes-app
   JWT_SECRET=your_secret_key

   # Client (.env)
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start Development Servers
   ```bash
   # Backend
   cd server
   npm run dev

   # Frontend
   cd client
   npm run dev
   ```

## API Documentation

### Authentication Endpoints
- POST `/api/auth/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

- POST `/api/auth/login` - User login
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

### Notes Endpoints
All note endpoints require Authentication header: `Bearer [token]`

- GET `/api/notes` - Retrieve user's notes
- POST `/api/notes` - Create new note
  ```json
  {
    "title": "Note Title",
    "content": "Note content here"
  }
  ```
- PUT `/api/notes/:id` - Update note
- DELETE `/api/notes/:id` - Delete note

## Future Improvements
- [ ] Add note categories/tags
- [ ] Implement rich text editing
- [ ] Add search functionality
- [ ] Implement note sharing
- [ ] Add dark mode support

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.