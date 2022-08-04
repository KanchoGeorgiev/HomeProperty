import React, { useState } from "react";

const Input = (props) => {
    const [isTouched, setIsTouched] = useState(false);

    const changeInputHandler = (e) => {
        if (props.name === "email") {
            props.onValidity(!e.target.validity.typeMismatch);
        } else if (props.name === "password") {
            props.onValidity(e.target.value.trim().length > 7);
        } else if (props.name === "text") {
            props.onValidity(e.target.value.trim().length > 0);
        } else if (props.name === "number") {
            props.onValidity(e.target.value > 19);
        }
        setIsTouched(false);
        props.onChangeInput(e.target.value);
    };
    const touchHandler = () => {
        setIsTouched(true);
    };
    return (
        <div>
            <div className="mb-1">
                <input
                    value={props.value}
                    name={props.name}
                    type={props.name}
                    autoComplete={props.name}
                    required
                    className={props.styles}
                    placeholder={props.text}
                    onChange={changeInputHandler}
                    onBlur={touchHandler}
                />
            </div>
            <p
                className={`mt-3 text-red-600 ${
                    isTouched && !props.valid ? "" : "opacity-0"
                }`}
            >
                {props.warning}
            </p>
        </div>
    );
};

export default Input;
