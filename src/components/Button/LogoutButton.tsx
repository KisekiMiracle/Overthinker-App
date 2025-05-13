import { useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router";
import { AuthContext } from "../utils/AuthContext";
import { FlatButton } from "./FlatButton";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function LogoutButton({ visible }: { visible: any }) {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	return (
		<FlatButton
			className={`w-full text-left ${visible ? "gap-3.5" : "gap-0 w-fit [&>div]:gap-0"}`}
			variant="sidenav"
			leadingIcon={<LuLogOut className="text-2xl" />}
			onClick={handleLogout}
		>
			{visible ? "Logout" : ""}
		</FlatButton>
	);
}
