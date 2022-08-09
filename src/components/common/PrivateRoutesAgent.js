import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const PrivateRoutesAgent = (props) => {
    const { isLoggedIn, userData } = useContext(AuthContext);

    if (!isLoggedIn) {
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
