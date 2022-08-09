import React from "react";
import ListingItem from "./ListingItem";
import ListingSearch from "../UI/ListingSearch";
import WrapperCard from "../cards/WrapperCard";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const ListingsCatalog = () => {
    const [listings, setListings] = useState([]);
    const fetchAllData = async () => {
        const response = await fetch("property/index");
        if (response.ok) {
            const data = await response.json();
            setListings(data);
        } else {
            alert("Cannot Fetch Data");
        }
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
            <Outlet />
        </WrapperCard>
    );
};

export default ListingsCatalog;
