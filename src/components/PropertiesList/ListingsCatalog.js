import React from "react";
import ListingItem from "./ListingItem";
import SearchMenu from "../UI/SearchMenu";
import WrapperCard from "../cards/WrapperCard";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import ListingContext from "../../contexts/ListingContext";

const ListingsCatalog = () => {
    const { filteredListings, search } = useContext(ListingContext);
    useEffect(() => {
        search();
    }, [search]);

    return (
        <WrapperCard>
            <SearchMenu color="bg-blue-700" />
            {filteredListings.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {filteredListings.map((x) => {
                        return <ListingItem key={x.id} {...x} />;
                    })}
                </div>
            )}
            {filteredListings.length === 0 && (
                <p className="text-center text-6xl mb-4 font-semibold text-gray-800 p-6 stroke">
                    No Listings Available
                </p>
            )}
            <Outlet />
        </WrapperCard>
    );
};

export default ListingsCatalog;
