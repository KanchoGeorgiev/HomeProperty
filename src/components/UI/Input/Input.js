import React, { useState } from "react";

const Input = (props) => {
    const [isTouched, setIsTouched] = useState(false);

    const changeInputHandler = (e) => {
        setIsTouched(false);
        props.onChangeInput(e.target.value, e.target.name);
        if (e.target.name === "email") {
            props.onValidity(e.target.validity.valid, e.target.name);
        } else {
            props.onValidity(e.target.value, e.target.name);
        }
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
                    type={props.type}
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
