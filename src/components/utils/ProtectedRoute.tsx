// src/components/utils/ProtectedRoute.tsx
import { useContext } from "react";

import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./AuthContext";

export function ProtectedRoute() {
	const { token, loading } = useContext(AuthContext);
	if (loading) return <div>Cargando...</div>; // o un spinner
	return token ? <Outlet /> : <Navigate to="/login" replace />;
}
