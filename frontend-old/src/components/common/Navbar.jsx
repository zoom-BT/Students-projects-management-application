/**
 * Barre de navigation
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { getInitials } from '../../utils/helpers';
import { useState } from 'react';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <Link to="/dashboard" className="flex items-center ml-4 lg:ml-0">
              <span className="text-2xl font-bold text-blue-600">PM</span>
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Gestionnaire de Projets
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {getInitials(user?.firstName, user?.lastName)}
                </div>
                <span className="hidden md:block text-gray-700 font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </button>

              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaUser className="mr-2" />
                      Mon profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
