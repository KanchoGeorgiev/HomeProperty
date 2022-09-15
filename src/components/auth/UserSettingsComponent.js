import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import BackgroundCard from "../cards/BackgroundCard";
import WrapperCard from "../cards/WrapperCard";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import Checkbox from "../UI/Checkbox";
const phoneValidation = (data) => {
    const re = /08[789]\d{7}/;
    return re.test(data);
};

const UserSettingsComponent = () => {
    const [value, setValue] = useState({
        password: "",
        passwordConfirm: "",
    });
    const [isValid, setIsValid] = useState({
        password: false,
        passwordConfirm: false,
        imageUrl: true,
        phone: false,
    });
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const { userData, imageUpdate } = useContext(AuthContext);
    const style =
        "w-full rounded-md border bordder-primary p-3 bg-primary text-base hover:bg-opacity-90 transition";

    const inputChangeHandler = (data, name) => {
        if (name === "phone") {
            setPhone(data);
        } else {
            setValue((prevValue) => {
                return { ...prevValue, [name]: data };
            });
        }
    };
    const avatarChangeHandler = (data, name) => {
        setAvatar(data);
    };
    const inputValidityHandler = (data, name) => {
        if (name === "password") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: data.trim().length > 7 };
            });
        } else if (name === "passwordConfirm") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: data === value.password };
            });
        } else if (name === "phone") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: phoneValidation(data) };
            });
        } else {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: true };
            });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`/user/update/${userData.id}`, {
            method: "PUT",
            headers: {
                "X-Api-Key": userData.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: value.password }),
        });
        if (response.ok) {
            navigate("/home");
            setValue({
                password: "",
                passwordConfirm: "",
            });
            setIsValid({
                password: false,
                passwordConfirm: false,
            });
        } else {
            alert("Something went wrong!");
        }
    };

    const submitAvatarHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`/user/update/${userData.id}`, {
            method: "PUT",
            headers: {
                "X-Api-Key": userData.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: avatar }),
        });
        if (response.ok) {
            imageUpdate(avatar);
            navigate("/home");
        } else {
            console.log(response);
            alert("Something went wrong!");
        }
    };
    const checkChange = () => {
        setChecked((prevState) => !prevState);
    };

    const phoneSubmitHandler = (e) => {
        e.preventDefault();
        if (isValid.phone) {
            console.log("working");
        }
    };
    return (
        <WrapperCard>
            <div className="w-2/3 mx-auto">
                <BackgroundCard>
                    <form className="w-1/2 mx-auto" onSubmit={submitHandler}>
                        <h3 className="text-center text-3xl mb-4 font-semibold text-gray-800 p-6">
                            Please, enter your new password
                        </h3>
                        <Input
                            value={value.password}
                            type="password"
                            name="password"
                            text="New Password"
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
                            text="Confirm New Password"
                            onChangeInput={inputChangeHandler}
                            onValidity={inputValidityHandler}
                            valid={isValid.passwordConfirm}
                            warning="Please add matching passwords!"
                            styles={style}
                        />
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Confirm
                        </button>
                    </form>
                    <form
                        className="w-1/2 mx-auto"
                        onSubmit={submitAvatarHandler}
                    >
                        <h3 className="text-center text-3xl mb-4 font-semibold text-gray-800 p-6">
                            Please, enter URL for your avatar{" "}
                        </h3>
                        <Input
                            value={avatar}
                            type="text"
                            name="imageUrl"
                            text="Image URL"
                            onChangeInput={avatarChangeHandler}
                            onValidity={inputValidityHandler}
                            valid={isValid.imageUrl}
                            warning=""
                            styles={style}
                        />
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Confirm
                        </button>
                    </form>
                    {userData.type === 1 && (
                        <form
                            className="w-1/2 mx-auto"
                            onSubmit={phoneSubmitHandler}
                        >
                            <Checkbox onChecked={checkChange} />
                            {checked && (
                                <div>
                                    <Input
                                        value={phone}
                                        type="text"
                                        name="phone"
                                        text="Phone Number"
                                        onChangeInput={inputChangeHandler}
                                        onValidity={inputValidityHandler}
                                        valid={isValid.phone}
                                        warning="Please, enter valid phone number!"
                                        styles={style}
                                    />
                                    <button
                                        type="submit"
                                        className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            )}
                        </form>
                    )}
                </BackgroundCard>
            </div>
        </WrapperCard>
    );
};

export default UserSettingsComponent;
