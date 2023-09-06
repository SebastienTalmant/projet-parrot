import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');

  return (

    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};