import { createContext, useState } from "react";
import { logoutSevice } from "../services/authService";

const AuthContext = createContext({
    isLoggedIn: false,
    userData: {},
    login: (data) => {},
    logout: () => {},
    imageUpdate: (data) => {},
});
const data = localStorage.getItem("auth");
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        if (data) {
            return true;
        } else {
            return false;
        }
    });

    const [userData, setUserData] = useState(() => {
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    });
    const loginHandler = (newData) => {
        setUserData(newData);
        localStorage.setItem("auth", JSON.stringify(newData));
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        logoutSevice();
        setIsLoggedIn(false);
        setUserData({});
    };
    const imageUpdateHandler = (data) => {
        setUserData((prevData) => {
            return { ...prevData, icon: data };
        });
    };
    const contextData = {
        isLoggedIn,
        userData,
        login: loginHandler,
        logout: logoutHandler,
        imageUpdate: imageUpdateHandler,
    };
    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
