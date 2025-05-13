import EditorJS from "@editorjs/editorjs";
import DragDrop from "editorjs-drag-drop";
import type React from "react";
import { memo, useEffect, useRef } from "react";
import { EDITOR_JS_TOOLS } from "../utils/editorTools";

interface EditorProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onChange: (data: any) => void;
	editorblock: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, editorblock }) => {
	const ref = useRef<EditorJS | null>(null);
	//Initialize editorjs
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		//Initialize editorjs if we don't have a reference
		if (!ref.current) {
			const editor = new EditorJS({
				holder: editorblock,
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				tools: EDITOR_JS_TOOLS as any,
				data: data,
				async onChange(api, _event) {
					const data = await api.saver.save();
					onChange(data);
				},
				onReady: () => {
					new DragDrop(editor);
				},
			});
			ref.current = editor;
		}

		//Add a return function to handle cleanup
		return () => {
			if (ref.current?.destroy) {
				ref.current.destroy();
			}
		};
	}, []);
	return <div id={editorblock} />;
};

export default memo(Editor);
