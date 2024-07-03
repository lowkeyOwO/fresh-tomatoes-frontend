"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Underline,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor}: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : " text-green-300 hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : " text-green-300 hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : " text-green-300 hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : " text-green-300 hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : " text-green-300 hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : " text-green-300 hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : "text-green-300  hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg "
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : "text-green-300 hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-green-300 text-gray-900 p-1 rounded-lg"
              : "text-green-300 hover:bg-green-300 hover:text-gray-900 p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
