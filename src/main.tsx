import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import App from "./App.tsx";
import NotHomeApp from "./NonHomeLayout.tsx";
import { AuthProvider } from "./components/utils/AuthContext.tsx";
import { ProtectedRoute } from "./components/utils/ProtectedRoute.tsx";
import { RedirectIfAuth } from "./components/utils/RedirectIfAuth.tsx";
import { Login } from "./routes";
import { Home } from "./routes/Home.tsx";
import { VoiceVoxPage } from "./routes/Voicevox.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<AuthProvider>
		<BrowserRouter>
			<Routes>
				{/* Protected app routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<App />}>
						<Route index element={<Home />} />
					</Route>
				</Route>

				{/* Protected app routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/voicevox" element={<NotHomeApp />}>
						<Route index element={<VoiceVoxPage />} />
					</Route>
				</Route>

				{/* Public routes (like /login) */}
				<Route element={<RedirectIfAuth />}>
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</AuthProvider>,
);
