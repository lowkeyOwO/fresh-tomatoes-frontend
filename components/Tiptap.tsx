"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import Placeholder from "@tiptap/extension-placeholder";

interface TiptapParams {
  onChange : (newContent : string) => void;
  content : string;
}


const Tiptap = ({ onChange, content }: TiptapParams) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Blockquote,
      Placeholder.configure({
        placeholder: "Hol' up, let them cook...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-300 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none mb-8",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    content : content
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </>
  );
};

export default Tiptap;
