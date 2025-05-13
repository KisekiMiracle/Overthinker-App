import type { ComponentPropsWithoutRef, ReactElement } from "react";

interface SearchbarProps extends ComponentPropsWithoutRef<"input"> {
	label: string;
	trailingIcon?: ReactElement;
	leadingIcon?: ReactElement;
}

export function Searchbar({
	label,
	trailingIcon,
	leadingIcon,
	...props
}: SearchbarProps) {
	return (
		<div {...props} className="flex flex-col gap-4 ">
			<label className="w-full bg-white">
				<div
					className="
                flex items-center justify-between gap-x-2 py-2 px-4 shadow-sm  w-full
                border-2 border-gray-300 rounded-lg
                text-sm text-gray-900
                transition-colors duration-200
                focus-within:border-blue-500 focus-within:text-blue-500"
				>
					<div className="flex grow items-center gap-4">
						{leadingIcon}
						<input
							type="text"
							placeholder={label}
							className="w-full text-lg text-gray-900 focus:border-0 focus:outline-none caret-blue-700"
						/>
					</div>
					{trailingIcon}
				</div>
			</label>
		</div>
	);
}
