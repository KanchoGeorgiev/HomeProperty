import React from "react";
import ListingItem from "./ListingItem";
import SearchMenu from "../UI/SearchMenu";
import WrapperCard from "../cards/WrapperCard";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import ListingContext from "../../contexts/ListingContext";

const ListingsCatalog = () => {
    const { filteredListings, search } = useContext(ListingContext);
    const fetchAllData = async () => {
            search();    
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <WrapperCard>
            <SearchMenu color="bg-blue-700" />
            <div className="mt-4 grid grid-cols-4 gap-4">
                {filteredListings.map((x) => {
                    return <ListingItem key={x.id} {...x} />;
                })}
            </div>
            <Outlet />
        </WrapperCard>
    );
};

export default ListingsCatalog;
