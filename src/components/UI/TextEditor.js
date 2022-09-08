import TextEditorMenuBar from "./TextEditorMenuBar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Underline from "@tiptap/extension-underline";

const TextEditor = ({ onChangeInput, type, styling }) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: ``,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChangeInput(html, type);
        },
    });
    return (
        <>
            <TextEditorMenuBar editor={editor} />
            <div className={styling}>
                <EditorContent editor={editor} />
            </div>
        </>
    );
};

export default TextEditor;
