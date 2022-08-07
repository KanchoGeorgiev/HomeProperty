import { createContext, useState } from "react";
import { logoutSevice } from "../services/authService";

const AuthContext = createContext({
    isLoggedIn: false,
    userData: {},
    login: (data) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            return true;
        } else {
            return false;
        }
    });

    const [userData, setUserData] = useState({});
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
    const contextData = {
        isLoggedIn,
        userData,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
