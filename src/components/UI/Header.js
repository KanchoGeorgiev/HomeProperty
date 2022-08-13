import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import defAvatar from "../../img/images.png";

const Header = () => {
    const { isLoggedIn, logout, userData } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const buttonRef = useRef();
    const navigate = useNavigate();

    const showUserMenuHandler = (e) => {
        e.preventDefault();
        setIsOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const handleOutsideClicks = (e) => {
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClicks);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };
    }, [isOpen]);

    const closeUserMenuHandler = () => {
        setIsOpen(false);
    };
    const logoutHandler = () => {
        logout();
        localStorage.removeItem("link");
        setIsOpen(false);
        navigate("/home");
    };

    const buttonActiveStyle = ({ isActive }) =>
        isActive
            ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-bold"
            : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <NavLink className="flex-shrink-0" to="/home">
                                <div className="text-xl text-white border-2 px-3 py-1 border-white ">
                                    Home{" "}
                                    <span className="text-blue-400">
                                        Property
                                    </span>
                                </div>
                            </NavLink>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink
                                        to="/home"
                                        className={buttonActiveStyle}
                                        aria-current="page"
                                    >
                                        Home
                                    </NavLink>

                                    <NavLink
                                        to="/listings"
                                        className={buttonActiveStyle}
                                    >
                                        Listings
                                    </NavLink>

                                    {isLoggedIn && userData.type === 1 && (
                                        <NavLink
                                            to="/calendar"
                                            className={buttonActiveStyle}
                                        >
                                            Appointments
                                        </NavLink>
                                    )}
                                    {isLoggedIn && userData.type === 1 && (
                                        <NavLink
                                            to="/newlisting"
                                            className={buttonActiveStyle}
                                        >
                                            New Listing
                                        </NavLink>
                                    )}
                                    <NavLink
                                        to="/contacts"
                                        className={buttonActiveStyle}
                                    >
                                        Contacts
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <div className="ml-3 relative">
                                    {!isLoggedIn && (
                                        <div>
                                            <NavLink
                                                to="/newagent"
                                                className={buttonActiveStyle}
                                                aria-current="page"
                                            >
                                                Become New Agent
                                            </NavLink>
                                            <NavLink
                                                to="/register"
                                                className={buttonActiveStyle}
                                                aria-current="page"
                                            >
                                                Register
                                            </NavLink>
                                            <NavLink
                                                to="/login"
                                                className={buttonActiveStyle}
                                                aria-current="page"
                                            >
                                                Login
                                            </NavLink>
                                        </div>
                                    )}
                                    {isLoggedIn && (
                                        <div>
                                            <div ref={dropdownRef}>
                                                <button
                                                    type="button"
                                                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                                    id="user-menu-button"
                                                    aria-expanded="false"
                                                    aria-haspopup="true"
                                                    onClick={
                                                        showUserMenuHandler
                                                    }
                                                    ref={buttonRef}
                                                >
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={
                                                            userData.icon ===
                                                            null
                                                                ? defAvatar
                                                                : userData.icon
                                                        }
                                                        alt="1"
                                                    />
                                                </button>
                                            </div>
                                            {isOpen && (
                                                <div
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="user-menu-button"
                                                    tabIndex="-1"
                                                    ref={dropdownRef}
                                                >
                                                    <Link
                                                        to="/settings"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                        role="menuitem"
                                                        tabIndex="-1"
                                                        id="user-menu-item-1"
                                                        onClick={
                                                            closeUserMenuHandler
                                                        }
                                                    >
                                                        Settings
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                        role="menuitem"
                                                        tabIndex="-1"
                                                        id="user-menu-item-2"
                                                        onClick={logoutHandler}
                                                    >
                                                        Sign out
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
