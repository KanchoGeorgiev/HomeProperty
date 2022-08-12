import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const PrivateRoutesAgent = () => {
    const { isLoggedIn, userData } = useContext(AuthContext);
    const location = useLocation();

    if (!isLoggedIn) {
        localStorage.setItem("link", JSON.stringify(location));
        return <Navigate to="/login" replace />;
    } else {
        if (userData.type !== 1) {
            return <Navigate to="/forbidden" replace />;
        } else {
            return <Outlet />;
        }
    }
};

export default PrivateRoutesAgent;
