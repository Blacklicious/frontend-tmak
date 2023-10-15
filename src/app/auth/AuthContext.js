'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

  // Add logic for fetching authentication status here...
  export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Fetch the currently authenticated user's information
      const fetchCurrentUser = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get('http://127.0.0.1:8000/accounts/api/current-user/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,  // Replace with your token retrieval logic
            },
          });
          setCurrentUser(response.data);
          console.log(response.data)
          localStorage.setItem('User', JSON.stringify(response.data));
          setIsLoading(false);

        } catch (error) {
          console.error('An error occurred while fetching data: ', error);
          // Erase 'access_token' from localStorage
          localStorage.removeItem('access_token');
          // Optionally, set the currentUser state back to null
          localStorage.removeItem('User');
          setIsLoading(false);
        }
      };
  
      fetchCurrentUser();
    }, []);
  
  
  return (
    <AuthContext.Provider value={{ currentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

