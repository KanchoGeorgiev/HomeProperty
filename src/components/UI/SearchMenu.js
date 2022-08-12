import React, { useState, useContext, useEffect } from "react";
import ListingContext from "../../contexts/ListingContext";
import { useNavigate } from "react-router-dom";

const SearchMenu = (props) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        city: "",
        price: "",
        area: "",
        type: "",
    });
    const { criteria, search } = useContext(ListingContext);
    const style =
        "w-full rounded-md border bordder-primary p-3 bg-white text-base hover:bg-opacity-90 transition";
    const inputChangeHandler = (data, name) => {
        setInputValue((prevState) => {
            return { ...prevState, [name]: data.target.value };
        });
    };
    useEffect(() => {
        criteria(inputValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue]);

    const submitSearchHandler = (e) => {
        e.preventDefault();
        search();
        navigate("/listings");
    };

    return (
        <>
            <form className="flex flex-col" onSubmit={submitSearchHandler}>
                <div className="grid grid grid-cols-2 grid-flow-row gap-2 place-items-start">
                    <input
                        value={inputValue.city}
                        type="text"
                        placeholder="City"
                        onChange={(e) => {
                            inputChangeHandler(e, "city");
                        }}
                        className={style}
                    />
                    <input
                        value={inputValue.price}
                        type="number"
                        placeholder="Maximum Price"
                        onChange={(e) => {
                            inputChangeHandler(e, "price");
                        }}
                        className={style}
                    />
                    <input
                        value={inputValue.area}
                        type="number"
                        placeholder="Minumum Area"
                        onChange={(e) => {
                            inputChangeHandler(e, "area");
                        }}
                        className={style}
                    />

                    <select
                        onChange={(e) => {
                            inputChangeHandler(e, "type");
                        }}
                        className={style}
                    >
                        <option defaultValue={0}>Choose Property type</option>
                        <option value={0}>Apartment</option>
                        <option value={1}>House</option>
                        <option value={2}>Studio</option>
                        <option value={3}>Other</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className={`mx-auto mt-3 py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-blue-800 ${props.color}`}
                >
                    Search
                </button>
            </form>
        </>
    );
};

export default SearchMenu;
