import React, { useState, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input/Input";
import AuthContext from "../../contexts/AuthContext";

const LoginComponent = () => {
    const [value, setValue] = useState({ email: "", password: "" });
    const [isValid, setIsValid] = useState({ email: false, password: false });
    const [warning, setWarning] = useState("Please, enter valid e-mail!");
    const { login } = useContext(AuthContext);
    const style =
        "w-full rounded-md border bordder-primary p-3 bg-primary text-base hover:bg-opacity-90 transition";
    const navigate = useNavigate();

    const inputChangeHandler = (data, name) => {
        setValue((prevValue) => {
            return { ...prevValue, [name]: data };
        });
    };

    const inputValidityHandler = (data, name) => {
        if (name === "email") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: data };
            });
        } else if (name === "password") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: data.trim().length > 7 };
            });
        }
    };
    const submitUserHandler = async (e) => {
        e.preventDefault();
        if (isValid.email && isValid.password) {
            const response = await fetch("/site/login", {
                method: "POST",
                body: JSON.stringify(value),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                login(data);
                setValue({ password: "", email: "" });
                setIsValid({ email: false, password: false });
                navigate("/home");
            } else {
                setIsValid((prevValue) => {
                    return { ...prevValue, email: false };
                });
                setWarning("Account or pasword incorrect!");
            }
        }
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
                            value={value.email}
                            type="email"
                            name="email"
                            text="Email address"
                            onChangeInput={inputChangeHandler}
                            onValidity={inputValidityHandler}
                            valid={isValid.email}
                            warning={warning}
                            styles={style}
                        />
                        <Input
                            value={value.password}
                            type="password"
                            name="password"
                            text="Password"
                            onChangeInput={inputChangeHandler}
                            onValidity={inputValidityHandler}
                            valid={isValid.password}
                            warning="Password must be at least 8 characters long!"
                            styles={style}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    to="/register"
                                    className="font-medium text-blue-600 hover:text-blue-400"
                                >
                                    Register New Account
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3 m-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-blue-500 group-hover:text-blue-300"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;
