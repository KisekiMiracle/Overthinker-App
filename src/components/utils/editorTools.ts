import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import RawTool from "@editorjs/raw";
import ColorPicker from "editorjs-color-picker";
import MultiBlockSelectionPlugin from "editorjs-multiblock-selection-plugin";
import Undo from "editorjs-undo";

export const EDITOR_JS_TOOLS = {
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
	},
	checkList: { class: CheckList, inlineToolbar: true },
	list: List,
	header: Header,
	delimiter: Delimiter,
	link: Link,
	RawTool,
	MultiBlockSelectionPlugin,
	Undo,
	ColorPicker: {
		class: ColorPicker,
		inlineToolbar: true,
	},
};
export {
	CheckList,
	Delimiter,
	Header,
	List,
	MultiBlockSelectionPlugin,
	Paragraph,
	RawTool,
	Undo,
};
