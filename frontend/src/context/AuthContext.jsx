import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../../api/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function login(authToken) {
    if (!authToken) {
      return;
    }

    setToken(authToken);
    localStorage.setItem("token", authToken);

    try {
      const currentUser = await getCurrentUser(); // for first time login in this session, coz token nahi first time p to useEffect user set kar hi nahi sakta
      setUser(currentUser);
    } catch (error) {
      // Token save hua, lekin current-user request fail ho gayi.
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);

      throw error;
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {

    async function checkUser() {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser(); // token already h, to ye kaam kar jaega
        setUser(currentUser);
      } catch {
        // Stored token invalid ya expired hai (matlab backend se 401 ara) ya api call crashed.
        localStorage.removeItem("token");
        setToken(null);
        setUser(null); // matlab user authenticated nahi h, backend se 401 ara hoga, to silently user null kardo
      } finally {
        setAuthLoading(false);
      }
    }

    checkUser();

  }, [])

  const value = {
    user,
    token,
    login,
    logout,
    authLoading,
    isAuthenticated: Boolean(token && user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { // ye fn `value` return karega
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}