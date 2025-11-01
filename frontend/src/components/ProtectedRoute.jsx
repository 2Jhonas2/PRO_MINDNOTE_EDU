import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const payload = jwtDecode(token);
    const now = Date.now() / 1000;
    if (payload?.exp && payload.exp < now) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  } catch {
    // token inválido
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
