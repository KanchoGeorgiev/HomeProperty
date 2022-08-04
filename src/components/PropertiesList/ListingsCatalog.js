import React from "react";
import ListingItem from "./ListingItem";
import ListingSearch from "../UI/Input/ListingSearch";
import WrapperCard from "../cards/WrapperCard";

const ListingsCatalog = () => {
    return (
        <WrapperCard>
            <ListingSearch />
            <div className="mt-4 grid grid-cols-4 gap-4 place-items-center">
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
                <ListingItem />
            </div>
        </WrapperCard>
    );
};

export default ListingsCatalog;
