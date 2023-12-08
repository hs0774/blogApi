import React, { createContext, useContext, useState,useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch token and user email from localStorage or context
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username')
        if(token && username){
            setUser({ token, username });
        }
      }, []);

    const login = (userData) => {
        setUser(userData);
    };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
