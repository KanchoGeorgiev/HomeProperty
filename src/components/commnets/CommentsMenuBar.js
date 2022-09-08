import React from "react";
import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaCode,
    FaEraser,
    FaUnderline,
} from "react-icons/fa";
const CommentsMenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="menuBar">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
            >
                <FaBold className="icon" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
            >
                <FaItalic className="icon" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
            >
                <FaUnderline className="icon" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
            >
                <FaStrikethrough className="icon" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive("code") ? "is-active" : ""}
            >
                <FaCode className="icon" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
            >
                <FaEraser className="icon" />
            </button>
        </div>
    );
};

export default CommentsMenuBar;
