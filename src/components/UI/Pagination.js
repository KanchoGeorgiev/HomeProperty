import React from "react";

const Pagination = (props) => {
    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(props.totalListings / props.listingsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example" className="mt-4">
            <ul className="inline-flex -space-x-px">
                <li>
                    <button
                        onClick={() => props.onPrevPage()}
                        type="button"
                        className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((x) => {
                    return (
                        <li key={x}>
                            <button
                                onClick={() => props.onSetPage(x)}
                                type="button"
                                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            >
                                {x}
                            </button>
                        </li>
                    );
                })}

                <li>
                    <button
                        onClick={() => props.onNextPage(pageNumbers.length)}
                        type="button"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
