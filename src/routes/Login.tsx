import { LoginForm } from "../components";

export default function Login() {
	return (
		<main>
			<section className="h-screen">
				<div className="h-full flex items-center justify-center bg-gray-100">
					<LoginForm />
				</div>
			</section>
		</main>
	);
}
