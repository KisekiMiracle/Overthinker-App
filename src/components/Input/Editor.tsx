import type { OutputData } from "@editorjs/editorjs";
import { useEffect, useRef } from "react";

interface EditorProps {
	data?: OutputData;
	onChange: (data: OutputData) => void;
	editorblock: string;
}

export default function Editor({ data, onChange, editorblock }: EditorProps) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const editorRef = useRef<any>(null);

	useEffect(() => {
		let isMounted = true;

		(async () => {
			// dynamic imports only run in the browser
			const EditorJS = (await import("@editorjs/editorjs")).default;
			const Paragraph = (await import("@editorjs/paragraph")).default;
			const CheckList = (await import("@editorjs/checklist")).default;
			const List = (await import("@editorjs/list")).default;
			const Header = (await import("@editorjs/header")).default;
			const Delimiter = (await import("@editorjs/delimiter")).default;
			const LinkTool = (await import("@editorjs/link")).default;

			if (!isMounted) return;

			editorRef.current = new EditorJS({
				holder: editorblock,
				data,
				tools: {
					paragraph: { class: Paragraph, inlineToolbar: true },
					checklist: { class: CheckList, inlineToolbar: true },
					list: { class: List, inlineToolbar: true },
					header: { class: Header, inlineToolbar: true },
					delimiter: Delimiter,
					linkTool: {
						class: LinkTool,
						config: { endpoint: "/your-endpoint" },
					},
				},
				async onChange(api) {
					const output = await api.saver.save();
					// strip out any empty paragraphs
					const cleaned = output.blocks.filter(
						(b) => b.type !== "paragraph" || !!b.data?.text?.trim(),
					);
					onChange({ ...output, blocks: cleaned });
				},
			});
		})();

		return () => {
			isMounted = false;
			editorRef.current?.destroy();
			editorRef.current = null;
		};
	}, [data, onChange, editorblock]);

	// this <div> is what Editor.js will “hydrate” into
	return <div id={editorblock} />;
}
