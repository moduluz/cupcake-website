import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Changed from jwt_decode to jwtDecode

const AuthContext = createContext(null);
const API_BASE_URL = 'http://localhost:5000/api/auth';

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateAndFetchUser = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      if (response.status === 401) {
        logout();
        return;
      }

      const userData = await response.json();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('User validation error:', error);
      logout();
    }
  };

  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      // Check if token is expired or about to expire in 5 minutes
      if (decodedToken.exp < currentTime + 300) {
        logout();
        return false;
      }
      return true;
    } catch {
      logout();
      return false;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (token && checkTokenExpiration()) {
        try {
          await validateAndFetchUser(token);
        } catch (error) {
          console.error('Auth initialization error:', error);
          logout();
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    initializeAuth();

    // Set up token expiration check interval
    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [checkTokenExpiration, validateAndFetchUser]);

  

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      setError(null);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error Response:', errorText);
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || 'Registration failed');
        } catch {
          throw new Error(errorText || 'Registration failed');
        }
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      setError(null);
      return data.user;
    } catch (error) {
      console.error('Registration Error:', error);
      setError(error.message);
      throw error;
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    setError(null);
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }


  const addTokenToRequest = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        isAuthenticated,
        login, 
        register, 
        logout, 
        error, 
        addTokenToRequest 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
