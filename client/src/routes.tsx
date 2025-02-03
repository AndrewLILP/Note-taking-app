import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import NoteList from './components/Notes/NoteList'
import NoteEdit from './components/Notes/NoteEdit'
import NoteForm from './components/Notes/NoteForm'
import Home from './components/Home'

// Protected Route wrapper component
interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  
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

const AppRoutes = () => {
  return (
    <>
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
    </>
  )
}

export default AppRoutes