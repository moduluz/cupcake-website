//C:\JavaScript\cupp cake\cupcake-website\src\contexts\AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);
const API_BASE_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Check for user in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      console.log('Fetching user with token:', token);
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET', // Explicitly set method to GET
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure 'Bearer ' prefix
          'Content-Type': 'application/json', // Add content type
        },
      });

      console.log('Fetch user response:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch user error response:', errorText);
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      console.log('Fetched user:', data);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    }
  };
  

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
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      setUser(data.user);
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
      setError(null);
      return data.user;
    } catch (error) {
      console.error('Registration Error:', error);
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setError(null);
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;