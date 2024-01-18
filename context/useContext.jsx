import React, { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (authUser, userData) => {
    setUser({
      uid: authUser.uid,
      email: authUser.email,
      fullName: userData.fullName,
      role: userData.role,
      dateMember: userData.dateMember,
    });
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
