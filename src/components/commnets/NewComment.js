import Input from "../UI/Input";
import React, { useState } from "react";
import CommentTextEditor from "./CommentTextEditor";

const NewComment = ({ onClose, onAddNewComment }) => {
    const [value, setValue] = useState({ name: "", text: "" });
    const [isValid, setIsValid] = useState({
        name: false,
        text: false,
    });
    const inputChangeHandler = (data, name) => {
        if (name === "text") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: data.trim().length > 0 };
            });
        }
        setIsValid((prevValue) => {
            return { ...prevValue, [name]: true };
        });
        setValue((prevValue) => {
            return { ...prevValue, [name]: data };
        });
    };
    const inputValidityHandler = (data, name) => {
        setIsValid((prevValue) => {
            return { ...prevValue, [name]: data.trim().length > 0 };
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (isValid.name && isValid.text) {
            onAddNewComment(value);
            onClose();
        } else {
            console.log(isValid);
            console.log(value);
            console.log("Enter valid data");
        }
    };
    const style =
        "w-full rounded-md border bordder-primary p-3 bg-primary text-base hover:bg-opacity-90 transition";

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-10">
            <div className="w-1/4 bg-white rounded-lg p-4">
                <header className="text-3xl font-bold text-neutral-800 text-center my-6">
                    Add your comment
                </header>
                <form onSubmit={submitHandler}>
                    <Input
                        value={value.name}
                        type="text"
                        name="name"
                        text="Please, enter your name"
                        onChangeInput={inputChangeHandler}
                        onValidity={inputValidityHandler}
                        valid={isValid.name}
                        warning="This field cannot be empty"
                        styles={style}
                    />
                    <CommentTextEditor onChangeInput={inputChangeHandler} />
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
