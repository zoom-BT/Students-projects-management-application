/**
 * Contexte d'authentification pour gérer l'état global de l'utilisateur
 */

import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);

          // Optionnel: Revalider le token avec le serveur
          try {
            const response = await authService.getMe();
            if (response.success) {
              setUser(response.data.user);
            }
          } catch (error) {
            // Token invalide, déconnecter
            authService.logout();
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Connexion
   */
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success) {
      setUser(response.data.user);
    }
    return response;
  };

  /**
   * Inscription
   */
  const register = async (userData) => {
    const response = await authService.register(userData);
    if (response.success) {
      setUser(response.data.user);
    }
    return response;
  };

  /**
   * Déconnexion
   */
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  /**
   * Mettre à jour le profil utilisateur
   */
  const updateProfile = async (profileData) => {
    const response = await authService.updateProfile(profileData);
    if (response.success) {
      setUser(response.data.user);
    }
    return response;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
