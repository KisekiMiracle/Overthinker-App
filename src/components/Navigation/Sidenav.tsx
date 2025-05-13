import { motion } from "motion/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GrDocumentConfig, GrDocumentText } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import {
	MdOutlineCloseFullscreen,
	MdSubdirectoryArrowRight,
} from "react-icons/md";
import {
	PiFolderLight,
	PiFolderOpen,
	PiTreeStructureThin,
} from "react-icons/pi";
import { NavLink } from "react-router";
import { DropdownButton, FlatButton } from "..";
import { LogoutButton } from "../Button/LogoutButton";

export function Sidenav() {
	// Handles the toggle state of this sidenav component.
	const [visible, setVisible] = useState(true);

	function toggleVisibilityHandler() {
		setVisible(!visible);
	}

	return (
		<motion.nav
			initial={false}
			animate={{ width: visible ? 260 : 82 }}
			transition={{ duration: 0.2, ease: "easeInOut" }}
			className="bg-stone-100 h-screen w-full border-r border-r-slate-300
						flex flex-col justify-between gap-4 px-4 py-4 shadow-sm"
		>
			<div className="flex flex-col gap-3.5">
				<motion.div
					animate={{ scale: visible ? 1 : 0.9 }}
					transition={{ duration: 0.2 }}
					className="flex items-center gap-2 w-full"
				>
					<GrDocumentText className={`text-6xl  ${visible ? "" : "w-10"}`} />
					{visible ? (
						<motion.h1
							initial={{ opacity: 0 }}
							animate={{ opacity: visible ? 1 : 0 }}
							transition={{ duration: 0.1, delay: visible ? 0.2 : 0 }}
							className="mx-2 font-bold text-lg "
						>
							Notes for Overthinkers
						</motion.h1>
					) : (
						<></>
					)}
				</motion.div>
				<hr className="text-slate-400" />
				<ul className="flex flex-col gap-2 whitespace-nowrap">
					<li>
						<NavLink to="/">
							<FlatButton
								variant="sidenav"
								leadingIcon={<IoHome className="text-2xl" />}
								className={`${visible ? "w-full" : "w-fit [&>div]:gap-0"}`}
							>
								{visible ? "Home" : ""}
							</FlatButton>
						</NavLink>
					</li>
					<li>
						<FlatButton
							variant="sidenav"
							leadingIcon={<PiTreeStructureThin className="text-2xl" />}
							className={`${visible ? "w-full" : "w-fit [&>div]:gap-0"}`}
						>
							{visible ? "Notes Structure" : ""}
						</FlatButton>
					</li>
					<li>
						<DropdownButton
							label={visible ? "Favorite Notes" : ""}
							className={`${visible ? "w-full" : "w-fit [&>div]:gap-0 [&~div]:p-0 [&~div]:w-fit"}`}
							leadingIcon={{
								open: <PiFolderOpen className="text-2xl" />,
								closed: <PiFolderLight className="text-2xl" />,
							}}
							trailingIcon={visible ? <FaChevronDown /> : <></>}
						>
							<div
								className={`flex flex-col gap-2 ${visible ? "py-2" : "p-0"}`}
							>
								<FlatButton
									className={`text-sm" ${visible ? "w-full " : "w-fit [&>div]:gap-0"}`}
									variant="sidenav"
									leadingIcon={
										<MdSubdirectoryArrowRight className="text-2xl" />
									}
								>
									{visible ? "Note #1" : ""}
								</FlatButton>
								<FlatButton
									className={`text-sm" ${visible ? "w-full " : "w-fit [&>div]:gap-0"}`}
									variant="sidenav"
									leadingIcon={
										<MdSubdirectoryArrowRight className="text-2xl" />
									}
								>
									{visible ? "Note #2" : ""}
								</FlatButton>
								<hr className="text-slate-300" />
								<FlatButton
									className={`text-sm" ${visible ? "w-full " : "w-fit [&>div]:gap-0"}`}
									variant="sidenav"
									leadingIcon={<GrDocumentConfig className="text-lg" />}
								>
									{visible ? "Manage Notes" : ""}
								</FlatButton>
							</div>
						</DropdownButton>
					</li>
				</ul>
			</div>
			<div className="flex flex-col gap-4">
				{/*..co - Pass down the actual state*/}
				<LogoutButton visible={visible} />
				<hr className="text-slate-400" />
				<FlatButton
					className={`w-full text-left ${visible ? "gap-3.5" : "gap-0 w-fit [&>div]:gap-0"}`}
					variant="sidenav"
					leadingIcon={<MdOutlineCloseFullscreen className="text-2xl" />}
					onClick={toggleVisibilityHandler}
				>
					{visible ? "Hide" : ""}
				</FlatButton>
			</div>
		</motion.nav>
	);
}
