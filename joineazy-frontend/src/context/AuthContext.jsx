import React, { createContext, useEffect, useState } from "react";
import { login as loginService, register as registerService } from "../services/authService";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("token");
    if (!t) return null;
    try {
      const decoded = jwt_decode(t);
      // if backend returns user object instead, you can store it in localStorage as well.
      return decoded?.user || JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return JSON.parse(localStorage.getItem("user")) || null;
    }
  });

  // Set auth header for axios
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await loginService(email, password);
    // expected { token, user }
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res;
  };

  const register = async (name, email, password, role) => {
    const res = await registerService(name, email, password, role);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = { token, setToken, user, setUser, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
