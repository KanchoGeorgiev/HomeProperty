import React, { useState, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import AuthContext from "../../contexts/AuthContext";
import { authService } from "../../services/authService";

const RegisterComponent = (props) => {
    const [value, setValue] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        type: props.type,
    });
    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
        passwordConfirm: false,
    });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const style =
        "w-full rounded-md border bordder-primary p-3 bg-primary text-base hover:bg-opacity-90 transition";

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
        } else if (name === "passwordConfirm") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: data === value.password };
            });
        }
    };

    const submitUserHandler = async (e) => {
        e.preventDefault();
        if (isValid.email && isValid.password && isValid.passwordConfirm) {
            const response = await authService(value, "reg");
            if (response.ok) {
                const loginData = {
                    email: value.email,
                    password: value.password,
                };
                const loginUser = await authService(loginData, "log");
                if (loginUser.ok) {
                    const data = await loginUser.json();
                    login(data);
                    setValue({ email: "", password: "", passwordConfirm: "" });
                    setIsValid({
                        email: false,
                        password: false,
                        passwordConfirm: false,
                    });
                    navigate("/home");
                } else {
                    alert("something went wrong");
                }
            } else {
                alert("Register unsuccessful");
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
                            {props.title}
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
                            warning="Please, enter valid e-mail!"
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

                        <Input
                            value={value.passwordConfirm}
                            type="password"
                            name="passwordConfirm"
                            text="Confirm Password"
                            onChangeInput={inputChangeHandler}
                            onValidity={inputValidityHandler}
                            valid={isValid.passwordConfirm}
                            warning="Please add matching passwords!"
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
