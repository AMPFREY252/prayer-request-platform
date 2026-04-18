import { Navigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { LoadingPage } from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
