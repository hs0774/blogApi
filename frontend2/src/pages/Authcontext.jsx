import React, { createContext, useContext, useState,useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch token and user email from localStorage or context
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username')
        const id = localStorage.getItem('id');
        if(token && username && id){
            setUser({ token, username,id });
        }
      }, []);

    const login = (userData) => {
        setUser(userData);
    };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
