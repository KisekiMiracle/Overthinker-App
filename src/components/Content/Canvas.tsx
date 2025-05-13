import { IoSearchOutline } from "react-icons/io5";
import { Searchbar } from "../Navigation/Searchbar";
import { Main } from "./Main";

export function Canvas() {
	return (
		<section className="w-full h-screen flex flex-col gap-4 p-4 overflow-hidden ">
			<Searchbar
				label="Search through all notes..."
				leadingIcon={<IoSearchOutline className="text-lg sticky top-0 " />}
			/>
			<div
				className="bg-white flex flex-col gap-4 rounded-2xl
                              py-6 px-8 overflow-auto"
			>
				<Main />
			</div>
		</section>
	);
}
