import React, { useState } from "react";
import WrapperCard from "../cards/WrapperCard";
import Input from "../UI/Input";

const ContactsForm = () => {
    const [value, setValue] = useState({ name: "", question: "" });
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState({
        name: false,
        question: false,
    });
    const inputChangeHandler = (data, name) => {
        if (name === "question") {
            setIsTouched(true);
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
    const blurHendaler = () => {
        setIsTouched(true);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (isValid.name && isValid.question) {
            console.log(value);
        } else {
            console.log("Enter valid data");
        }
    };
    const style =
        "w-full rounded-md border bordder-primary p-3 bg-primary text-base hover:bg-opacity-90 transition";
    const questionPlaceholder =
        isTouched && !isValid.question
            ? "This field must be filled"
            : "Enter your question here";
    return (
        <WrapperCard>
            <header className="text-5xl font-bold text-neutral-800 text-center my-6">
                Contact us
            </header>
            <form className="w-1/2 mx-auto" onSubmit={submitHandler}>
                <Input
                    value={value.email}
                    type="text"
                    name="name"
                    text="Please, enter your name"
                    onChangeInput={inputChangeHandler}
                    onValidity={inputValidityHandler}
                    valid={isValid.name}
                    warning="This field cannot be empty"
                    styles={style}
                />
                <textarea
                    className={`${style} mt-4`}
                    rows="4"
                    placeholder={questionPlaceholder}
                    onBlur={blurHendaler}
                    onChange={(e) => {
                        inputChangeHandler(e.target.value, "question");
                        inputValidityHandler(e.target.value, "question");
                    }}
                />
                <button
                    type="submit"
                    className="w-full mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-amber-700 bg-stone-400"
                >
                    Submit
                </button>
            </form>
        </WrapperCard>
    );
};

export default ContactsForm;
