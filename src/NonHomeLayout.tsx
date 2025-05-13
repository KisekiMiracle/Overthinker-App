import { Outlet } from "react-router";

export default function NotHomeApp() {
	return (
		<main className="flex">
			<section className="flex flex-col w-full p-8">
				<Outlet />
			</section>
		</main>
	);
}
