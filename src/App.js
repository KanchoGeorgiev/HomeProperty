import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Contacts from "./pages/Contacts";
import Calendar from "./pages/Calendar";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import ListingItemDetail from "./pages/ListingItemDetail";
import NewAgent from "./pages/NewAgent";
import NewListing from "./pages/NewListing";
import NotFound from "./pages/NotFound";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            return true;
        } else {
            return false;
        }
    });
    const [userData, setUserData] = useState({});
    const login = (newData) => {
        setUserData(newData);
        localStorage.setItem("auth", JSON.stringify(newData));
        setIsLoggedIn(true);
    };
    const logout = () => {
        const data = localStorage.getItem("auth");
        const storedData = JSON.parse(data);
        fetch("/site/logout", {
            method: "POST",
            headers: {
                "X-Api-Key": storedData.token,
                "Content-Type": "application/json",
            },
        });
        localStorage.clear("auth");
        setIsLoggedIn(false);
        setUserData({});
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            <Header />

            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/newagent" element={<NewAgent />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/settings" element={<UserSettings />} />
                <Route
                    path="/listings/detail"
                    element={<ListingItemDetail />}
                />
                <Route path="/newlisting" element={<NewListing />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </AuthContext.Provider>
    );
}

export default App;
