import React from "react";
import ListingItem from "./ListingItem";
import ListingSearch from "../UI/Input/ListingSearch";
import WrapperCard from "../cards/WrapperCard";
import { useState, useEffect } from "react";

const ListingsCatalog = () => {
    const [listings, setListings] = useState([]);
    const fetchAllData = async () => {
        const response = await fetch("property/index");
        const data = await response.json();
        setListings(data);
    };

    useEffect(() => {
        fetchAllData();
    }, []);
    return (
        <WrapperCard>
            <ListingSearch />
            <div className="mt-4 grid grid-cols-4 gap-4">
                {listings.map((x) => {
                    return <ListingItem key={x.id} {...x} />;
                })}
            </div>
        </WrapperCard>
    );
};

export default ListingsCatalog;
