import { useState } from "react";
import { Editor } from "../components";

// TODO - Create UI Notifications
// TODO - Look into the Voicevox.tsx file for more todos
// TODO - Dashboard where there are "apps" onto the main view by default.

// Initial Data
const INITIAL_DATA = {
	time: new Date().getTime(),
	blocks: [
		{
			type: "header",
			data: {
				text: "Welcome to the Most Convoluted Note Taking App",
				level: 1,
			},
		},
	],
};

export function Home() {
	const [data, setData] = useState(INITIAL_DATA);
	return (
		<article>
			<div className="flex flex-col">
				<div className="flex prose lg:prose-lg self-center min-w-fit">
					<Editor
						data={data}
						onChange={setData}
						editorblock="editorjs-container"
					/>
				</div>
			</div>
		</article>
	);
}
