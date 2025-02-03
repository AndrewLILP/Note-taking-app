import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import './App.css'

// Components
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NoteList from './components/Notes/NoteList'
import NoteEdit from './components/Notes/NoteEdit'
import NoteForm from './components/Notes/NoteForm'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'

// Create a new QueryClient instance
const queryClient = new QueryClient()

// Protected Route wrapper component
interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Replace this with your actual auth check logic
  const isAuthenticated = localStorage.getItem('token') !== null
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// Not Found component
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-xl">Page not found</p>
  </div>
)

// Home/Landing page component with preserved Vite + React elements
const Home = () => {
  const [showLogin, setShowLogin] = useState(true)
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Notes App</h1>
        <p className="text-lg text-gray-600 mb-8">
          A simple and secure way to manage your notes
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="flex mb-4 rounded-lg overflow-hidden">
            <button
              className={`flex-1 py-3 transition-colors ${
                showLogin 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 transition-colors ${
                !showLogin 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setShowLogin(false)}
            >
              Register
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            {showLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />

              {/* Protected routes */}
              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <NoteList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes/new"
                element={
                  <ProtectedRoute>
                    <NoteForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes/:id"
                element={
                  <ProtectedRoute>
                    <NoteEdit />
                  </ProtectedRoute>
                }
              />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App