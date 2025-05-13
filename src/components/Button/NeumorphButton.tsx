import type React from "react";
import type { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	label: string;
	icon: React.ReactElement;
	parentMethod?: (event: React.SyntheticEvent) => void;
}

export function NeumorphButton({
	label = "Submit",
	type = "button",
	disabled = false,
	icon,
	parentMethod,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			type={type}
			className="
				flex flex-row items-center justify-center py-2 gap-2.5
				border rounded-md bg-black text-white
				transition-colors duration-150 ease-in
				hover:bg-white hover:text-black hover:cursor-pointer
				active:bg-transparent active:shadow-[inset_0.2rem_0.2rem_0.4rem_0_rgb(0,0,0,0.2)] active:text-black active:border-gray-300
				active:[&>*]:translate-y-0.5
				disabled:cursor-wait disabled:pointer-events-none disabled:bg-gray-50  disabled:text-gray-700 disabled:border-gray-200
			"
			onClick={parentMethod}
			disabled={disabled}
		>
			{icon}
			<p className="text-1">{label}</p>
		</button>
	);
}
