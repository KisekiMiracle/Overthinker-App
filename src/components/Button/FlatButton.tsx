import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { cn } from "../utils/cn";

interface Props extends ComponentPropsWithoutRef<"button"> {
	children: string;
	leadingIcon?: ReactElement;
	trailingIcon?: ReactElement;
	variant?: "primary" | "secondary" | "sidenav";
}

export function FlatButton({
	children,
	leadingIcon,
	trailingIcon,
	type = "button",
	variant,
	className,
	...props
}: Props) {
	return (
		<button
			{...props}
			type={type}
			className={cn(buttonvariants({ variant }), className)}
		>
			<div className="flex items-center gap-3.5">
				{leadingIcon}
				<p>{children}</p>
			</div>
			{trailingIcon}
		</button>
	);
}

const buttonvariants = cva(
	"flex h-fit justify-between items-center py-1.5 px-2.5 rounded-md transition-colors duration-150 hover:cursor-pointer",
	{
		variants: {
			variant: {
				primary: "bg-indigo-600 text-white hover:bg-indigo-500",
				secondary: "border",
				sidenav: cn(
					"w-full",
					"font-semibold hover:bg-indigo-100/50 hover:text-indigo-600",
					"data-[state=open]:bg-indigo-600 data-[state=open]:text-white",
				),
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);
