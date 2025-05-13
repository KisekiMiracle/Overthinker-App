import { type ReactNode, createContext, useEffect, useState } from "react";

type AuthContextType = {
	token: string | null;
	setToken: (token: string | null) => void;
	logout: () => void;
	loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
	token: null,
	setToken: () => {},
	logout: () => {},
	loading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setTokenState] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem("auth_token");
		if (storedToken) setTokenState(storedToken);
		setLoading(false);
	}, []);

	const setToken = (newToken: string | null) => {
		if (newToken) {
			localStorage.setItem("auth_token", newToken);
		} else {
			localStorage.removeItem("auth_token");
		}
		setTokenState(newToken);
	};

	const logout = () => {
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ token, setToken, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}
