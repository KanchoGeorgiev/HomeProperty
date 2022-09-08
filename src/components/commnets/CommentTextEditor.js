import CommentsMenuBar from "./CommentsMenuBar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Underline from "@tiptap/extension-underline";

const CommentTextEditor = ({ onChangeInput }) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: ``,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChangeInput(html, "text");
        },
    });
    return (
        <>
            <CommentsMenuBar editor={editor} />
            <div className="commentInput">
                <EditorContent editor={editor} />
            </div>
        </>
    );
};

export default CommentTextEditor;
