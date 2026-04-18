import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "adminAuth";
const ADMIN_USERNAME = "stratedev";
const ADMIN_PASSWORD = "strate.15";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setIsAuthenticated(stored === "true");
    setIsInitializing(false);
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isInitializing, login, logout };
}
