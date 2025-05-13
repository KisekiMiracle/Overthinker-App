import { useActionState, useContext, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { NeumorphButton, TextInput } from "..";
import supabase from "../../supabase/client";
import { AuthContext } from "../utils/AuthContext";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const submitUserData = async (_prevState: any, formData: FormData) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: (formData.get("email") as string) || "",
			password: (formData.get("password") as string) || "",
		});

		if (error) {
			return {
				error: {
					status: error.status ?? 500,
					code: error.code ?? "unknown_error",
					message: error.message,
				},
			};
		}

		console.log({ session: data.session });
		return {
			session: data.session,
			success: true,
		};
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			error: {
				status: 500,
				code: "unexpected_error",
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				message: (error as any)?.message || "Unknown error occurred",
			},
		};
	}
};

export function LoginForm() {
	const navigate = useNavigate();
	const { setToken } = useContext(AuthContext);
	const [state, formAction, isPending] = useActionState(submitUserData, null);

	useEffect(() => {
		if (state?.success) {
			setToken(state.session.access_token);
			navigate("/");
		}
	}, [state, setToken, navigate]);

	return (
		<div
			className="flex flex-col gap-y-6 w-md py-12 px-12
               bg-white rounded-xl shadow-sm"
		>
			<h1 className="text-[1.75rem] font-bold">Sign in to your account</h1>
			<form
				id="login-form"
				noValidate
				className="flex flex-col gap-y-6 "
				action={formAction}
			>
				<TextInput
					label="Email"
					name="email"
					placeholder="your@email.com"
					icon={<FiMail />}
					type="email"
					required
					autoComplete="email"
				/>
				<TextInput
					label="Password"
					name="password"
					placeholder="Enter your password"
					icon={<IoKeyOutline />}
					type="password"
					required
					minLength={6}
					autoComplete="current-password"
				/>
				<NeumorphButton
					type="submit"
					label={isPending ? "Submitting..." : "Login"}
					disabled={isPending}
					icon={<FaLocationArrow />}
				/>

				{state?.error ? (
					<div>
						{state.error.status}
						{state.error.code}
						{state.error.message}
					</div>
				) : null}
			</form>
		</div>
	);
}
