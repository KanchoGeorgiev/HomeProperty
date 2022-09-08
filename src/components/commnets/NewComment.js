import React, { useState } from "react";
import TextEditor from "../UI/TextEditor";

const NewComment = ({ onClose, onAddNewComment }) => {
    const [text, setText] = useState("");
    const [isValid, setIsValid] = useState(false);
    const inputChangeHandler = (data) => {
        setText(data);
        setIsValid(true);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (isValid) {
            onAddNewComment(text);
        } else {
            console.log(isValid);
            console.log(text);
            console.log("Enter valid data");
        }
    };

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-10">
            <div className="w-1/4 bg-white rounded-lg p-4">
                <header className="text-3xl font-bold text-neutral-800 text-center my-6">
                    Add your comment
                </header>
                <form onSubmit={submitHandler}>
                    <TextEditor
                        onChangeInput={inputChangeHandler}
                        type="text"
                        styling="comment"
                    />
                    <div className="flex">
                        <button
                            onClick={onClose}
                            type="button"
                            className="mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-amber-700 bg-stone-400 flex-grow mx-1"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-amber-700 bg-stone-400 flex-grow mx-1"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewComment;
