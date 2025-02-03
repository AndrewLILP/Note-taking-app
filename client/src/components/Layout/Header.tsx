import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Notes App
          </Link>

          <nav>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/notes"
                  className="text-gray-600 hover:text-gray-900"
                >
                  My Notes
                </Link>
                <Link
                  to="/notes/new"
                  className="text-gray-600 hover:text-gray-900"
                >
                  New Note
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

// client/src/components/Layout/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Notes App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;