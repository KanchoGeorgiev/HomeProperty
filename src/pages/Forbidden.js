import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
    return (
        <div
            className="
    flex
    items-center
    justify-center
    bg-gray-100
  "
        >
            <div className="px-40 py-20 bg-white rounded-md shadow-xl my-56">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-blue-600 text-9xl">FORBIDDEN</h1>

                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-red-500">Oops!</span> Page needs
                        authtorisation
                    </h6>

                    <p className="mb-8 text-center text-gray-500 md:text-lg">
                        You need to be an agent to access this page.
                    </p>

                    <Link
                        to="/home"
                        className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
