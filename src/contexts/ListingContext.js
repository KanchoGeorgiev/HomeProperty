import { createContext, useState } from "react";

const ListingContext = createContext({
    filteredListings: [],
    criteria: (data) => {},
    search: () => {},
});

export const ListingContextProvider = (props) => {
    const [filteredListings, setFilteredListings] = useState([]);
    const [criteria, setCriteria] = useState({
        city: "",
        price: "",
        area: "",
        type: "",
    });

    const getCriteria = (data) => {
        setCriteria(data);
    };

    const filterLisitngs = async () => {
        const result = await fetch("property/index");
        if (result.ok) {
            const data = await result.json();
            let filtered = data;

            if (criteria.city !== "") {
                filtered = data.filter((x) => x.city.includes(criteria.city));
                setFilteredListings(filtered);
            }
            if (criteria.price !== "") {
                filtered = filtered.filter(
                    (x) => Number(x.price) <= Number(criteria.price)
                );
                setFilteredListings(filtered);
            }
            if (criteria.area !== "") {
                filtered = filtered.filter(
                    (x) => Number(x.area) >= Number(criteria.area)
                );
                setFilteredListings(filtered);
            }
            if (
                criteria.type !== "" &&
                criteria.type !== "Show All"
            ) {
                filtered = filtered.filter(
                    (x) => Number(x.type) === Number(criteria.type)
                );
                setFilteredListings(filtered);
            }
            setFilteredListings(filtered);
        } else {
            alert("Cannot Fetch Data");
        }
    };
    return (
        <ListingContext.Provider
            value={{
                filteredListings,
                criteria: getCriteria,
                search: filterLisitngs,
            }}
        >
            {props.children}
        </ListingContext.Provider>
    );
};

export default ListingContext;
