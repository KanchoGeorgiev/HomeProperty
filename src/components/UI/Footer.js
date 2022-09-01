import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer
            className="px-4 py-6 bg-neutral-800 text-neutral-400 fixed fixed inset-x-0 z-10 bottom-0"
        >
            <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
                <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
                    <NavLink className="flex-shrink-0" to="/home">
                        <div className="text-xl text-white border-2 px-3 py-1 border-white ">
                            Home <span className="text-blue-400">Property</span>
                        </div>
                    </NavLink>
                    <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
                        <li>Terms of Use</li>
                        <li>Privacy</li>
                    </ul>
                </div>
                <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Twitter</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
