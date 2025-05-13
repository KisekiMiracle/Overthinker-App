import { Outlet } from "react-router";
import { Searchbar, Sidenav } from "./components";

export default function App() {
	return (
		<main className="flex">
			<aside>
				<Sidenav />
			</aside>
			<section className="flex flex-col w-full p-8">
				<Searchbar label="Search throughout notes..." />
				<Outlet />
			</section>
		</main>
	);
}
