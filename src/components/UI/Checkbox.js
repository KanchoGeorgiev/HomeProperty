import React from "react";

const Checkbox = ({ onChecked }) => {
    const changeHandler = () => {
        onChecked();
    };

    return (
        <div className="flex mt-2">
            <input
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
                onChange={changeHandler}
            />
            <label className="react-switch-label" htmlFor={`react-switch-new`}>
                <span className={`react-switch-button`} />
            </label>
            <span className="ml-2 font-semibold text-gray-800">
                Should you be contacted via phone?
            </span>
        </div>
    );
};

export default Checkbox;
