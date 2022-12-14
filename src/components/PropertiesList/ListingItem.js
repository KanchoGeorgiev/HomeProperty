import React from "react";
import { Link } from "react-router-dom";
import parser from "html-react-parser";

const ListingItem = (props) => {
    return (
        <div className="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md">
            <Link to={`/listings/${props.id}`}>
                <img
                    className="w-full rounded-t-lg h-56"
                    src={props.image}
                    alt="1"
                />

                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight h-16 text-gray-900 overflow-hidden">
                        {props.headline}
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 h-20 overflow-hidden">
                        {parser(props.description)}
                    </p>
                    <p className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400">
                        Read more
                        <svg
                            aria-hidden="true"
                            className="ml-2 -mr-1 w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ListingItem;
