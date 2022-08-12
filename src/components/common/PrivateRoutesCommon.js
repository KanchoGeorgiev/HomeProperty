import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const PrivateRoutesCommon = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const location = useLocation();

    if (!isLoggedIn) {
        localStorage.setItem("link", JSON.stringify(location));
        return <Navigate to="/login" />;
    } else {
        return <Outlet />;
    }
};

export default PrivateRoutesCommon;
