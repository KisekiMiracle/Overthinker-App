// utils/RedirectIfAuth.tsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./AuthContext";

export function RedirectIfAuth() {
	const { token } = useContext(AuthContext);
	// if we have a token, send them to home; otherwise render children
	return token ? <Navigate to="/" replace /> : <Outlet />;
}
