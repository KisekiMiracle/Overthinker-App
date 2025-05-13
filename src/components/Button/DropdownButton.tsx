import {
	type ComponentPropsWithoutRef,
	type ReactElement,
	useEffect,
	useRef,
	useState,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { FlatButton } from "./FlatButton";

interface DropdownItemProps extends ComponentPropsWithoutRef<"button"> {
	label: string;
	leadingIcon?: {
		closed: ReactElement;
		open: ReactElement;
	};
	trailingIcon?: ReactElement;
	children: React.ReactNode;
}

export function DropdownButton({
	label,
	children,
	leadingIcon,
	trailingIcon,
	...props
}: DropdownItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setHeight(isOpen ? contentRef.current.scrollHeight : 0);
		}
	}, [isOpen]);

	return (
		<>
			<FlatButton
				leadingIcon={
					leadingIcon
						? isOpen
							? leadingIcon.open
							: leadingIcon.closed
						: undefined
				}
				variant="sidenav"
				data-state={isOpen ? "open" : "closed"}
				trailingIcon={
					<span
						className={`text-md transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
					>
						{trailingIcon ? trailingIcon : <FaChevronDown />}
					</span>
				}
				onClick={() => setIsOpen(!isOpen)}
				{...props}
			>
				{label}
			</FlatButton>
			<div
				ref={contentRef}
				style={{
					maxHeight: `${height}px`,
				}}
				className={`mt-2 px-2 gap-1 flex flex-col overflow-hidden border shadow-md rounded-lg transition-[max-height] duration-300 ease-in-out ${isOpen ? "border-slate-300" : "border-0"}`}
			>
				{children}
			</div>
		</>
	);
}
