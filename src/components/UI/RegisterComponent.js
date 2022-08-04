import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input/Input";

const RegisterComponent = (props) => {
    const [value, setValue] = useState({ mail: "", pass: "" });
    const [isValid, setIsValid] = useState({ mail: false, pass: false });
    const style =
        "w-full rounded-md border bordder-primary p-3 bg-primary text-base hover:bg-opacity-90 transition";
    const navigate = useNavigate();
    const submitUserHandler = (e) => {
        e.preventDefault();
        if (isValid.mail && isValid.pass) {
            console.log(value);
            setValue({ pass: "", mail: "" });
            setIsValid({ mail: false, pass: false });
            navigate("/home");
        }
    };
    const mailChangeHandler = (data) => {
        setValue((prevValue) => {
            return { ...prevValue, mail: data };
        });
    };

    const passChangeHandler = (data) => {
        setValue((prevValue) => {
            return { ...prevValue, pass: data };
        });
    };
    const mailValidationCheck = (data) => {
        setIsValid((prevValue) => {
            return { ...prevValue, mail: data };
        });
    };

    const passValidationCheck = (data) => {
        setIsValid((prevValue) => {
            return { ...prevValue, pass: data };
        });
    };
    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-4">
                    <div>
                        <div className="text-3xl text-black border-2 px-3 py-1 border-black text-center w-7/12 mx-auto">
                            Home <span className="text-blue-400">Property</span>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <form
                        className="mt-8 space-y-2"
                        onSubmit={submitUserHandler}
                    >
                        <Input
                            value={value.mail}
                            name="email"
                            text="Email address"
                            onChangeInput={mailChangeHandler}
                            onValidity={mailValidationCheck}
                            valid={isValid.mail}
                            warning="Please, enter valid e-mail!"
                            styles={style}
                        />
                        <Input
                            value={value.pass}
                            name="password"
                            text="Password"
                            onChangeInput={passChangeHandler}
                            onValidity={passValidationCheck}
                            valid={isValid.pass}
                            warning="Password must be at least 8 characters long!"
                            styles={style}
                        />

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-600 hover:text-blue-400"
                                >
                                    Log in with existing account
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3 m-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-blue-500 group-hover:text-blue-300"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterComponent;
