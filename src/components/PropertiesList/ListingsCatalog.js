import React, { useState } from "react";
import ListingItem from "./ListingItem";
import SearchMenu from "../UI/SearchMenu";
import WrapperCard from "../cards/WrapperCard";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import ListingContext from "../../contexts/ListingContext";
import Pagination from "../UI/Pagination";

const ListingsCatalog = () => {
    const { filteredListings, search } = useContext(ListingContext);
    const [currentPage, setrCurrentPage] = useState(1);
    const listingsPerPage = 12;
    useEffect(() => {
        search();
    }, []);

    const indexOfLast = currentPage * listingsPerPage;
    const indexOfFirst = indexOfLast - listingsPerPage;
    const currentListings = filteredListings.slice(indexOfFirst, indexOfLast);

    const pageSetHandler = (data) => {
        setrCurrentPage(data);
    };
    const prevHandler = () => {
        if (currentPage > 1) {
            setrCurrentPage(currentPage - 1);
        }
    };
    const nextHandler = (data) => {
        if (currentPage < data) {
            setrCurrentPage(currentPage + 1);
        }
    };
    return (
        <WrapperCard>
            <SearchMenu color="bg-blue-700" />
            {filteredListings.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {currentListings.map((x) => {
                        return <ListingItem key={x.id} {...x} />;
                    })}
                </div>
            )}
            {filteredListings.length === 0 && (
                <p className="text-center text-6xl mb-4 font-semibold text-gray-800 p-6 stroke">
                    No Listings Available
                </p>
            )}

            {filteredListings.length > 12 && (
                <Pagination
                    listingsPerPage={listingsPerPage}
                    totalListings={filteredListings.length}
                    onSetPage={pageSetHandler}
                    onNextPage={nextHandler}
                    onPrevPage={prevHandler}
                />
            )}
            <Outlet />
        </WrapperCard>
    );
};

export default ListingsCatalog;
