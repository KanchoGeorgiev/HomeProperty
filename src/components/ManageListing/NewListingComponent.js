import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../UI/Map";
import Input from "../UI/Input";
import AuthContext from "../../contexts/AuthContext";

const NewListingComponent = () => {
    const [inputValue, setInputValue] = useState({
        headline: "",
        area: 0,
        price: 0,
        city: "",
        street: "",
        description: "No description added",
        type: 0,
        lat: 42.6903,
        lng: 23.405,
    });

    const [isValid, setIsValid] = useState({
        headline: false,
        area: false,
        price: false,
        city: false,
        street: false,
        description: true,
    });
    const [urls, setUrls] = useState([""]);

    const { userData } = useContext(AuthContext);

    const style =
        "w-full block rounded-md border bordder-primary py-3 px-5 mt-3 bg-primary text-base";

    const navigate = useNavigate();
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (
            isValid.headline &&
            isValid.area &&
            isValid.price &&
            isValid.city &&
            isValid.street
        ) {
            console.log(urls);
            const awayData = { ...inputValue, imageUrls: urls };
            const response = await fetch("property/create", {
                method: "POST",
                headers: {
                    "X-Api-Key": userData.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(awayData),
            });
            if (response.ok) {
                navigate("/listings");
            } else {
                console.log(response);
            }
        }
    };

    const inputChangeHandler = (data, name) => {
        setInputValue((prevState) => {
            return { ...prevState, [name]: data };
        });
    };

    const inputValidation = (data, name) => {
        if (name === "headline" || name === "city" || name === "street") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: data.trim().length > 0 };
            });
        } else if (name === "price" || name === "area") {
            setIsValid((prevValue) => {
                return { ...prevValue, [name]: data > 19 };
            });
        }
    };

    const coordinatesChangeHandler = (data1, data2) => {
        setInputValue((prevState) => {
            return { ...prevState, lat: data1, lng: data2 };
        });
    };
    const urlInputHandler = (index, e) => {
        let currentData = [...urls];
        currentData[index] = e.target.value;
        setUrls(currentData);
    };
    const moreUrlsHandler = (e) => {
        e.preventDefault();
        const newField = "";
        setUrls((prevFields) => [...prevFields, newField]);
    };
    const selectInputHandelr = (e) => {
        setInputValue((prevState) => {
            return { ...prevState, type: e.target.value };
        });
    };
    return (
        <>
            <div className="min-h-full flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className=" w-full space-y-8">
                    <div className="text-3xl text-black border-2 px-3 py-1 border-black text-center w-2/12 mx-auto">
                        Home <span className="text-blue-400">Property</span>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Please, fill information below
                    </h2>
                </div>
                <div className=" w-2/3 mx-auto flex ">
                    <form
                        className="w-1/6 mt-8 space-y-4 flex-grow"
                        onSubmit={formSubmitHandler}
                    >
                        <div className="mb-5">
                            <Input
                                value={inputValue.headline}
                                type="text"
                                name="headline"
                                text="Headline"
                                onChangeInput={inputChangeHandler}
                                onValidity={inputValidation}
                                valid={isValid.headline}
                                warning="This field must be filled!"
                                styles={style}
                            />
                            <Input
                                value={inputValue.area}
                                type="number"
                                name="area"
                                text="Area"
                                onChangeInput={inputChangeHandler}
                                onValidity={inputValidation}
                                valid={isValid.area}
                                warning="Area must be at least 20 sqare meters!"
                                styles={style}
                            />
                            {urls.map((x, index) => {
                                return (
                                    <input
                                        name="url"
                                        key={index}
                                        type="text"
                                        className={style}
                                        value={x.url}
                                        onChange={(e) =>
                                            urlInputHandler(index, e)
                                        }
                                    />
                                );
                            })}
                            <button
                                type="submit"
                                onClick={moreUrlsHandler}
                                className="group relative mx-auto mt-6 w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400"
                            >
                                Add More URLS
                            </button>
                            <span>Please, select propserty type:</span>{" "}
                            <select
                                value={inputValue.type}
                                onChange={selectInputHandelr}
                            >
                                <option value={0}>Apartment</option>
                                <option value={1}>House</option>
                                <option value={2}>Studio</option>
                                <option value={3}>Other</option>
                            </select>
                            <Input
                                value={inputValue.price}
                                type="number"
                                name="price"
                                text="Price"
                                onChangeInput={inputChangeHandler}
                                onValidity={inputValidation}
                                valid={isValid.price}
                                warning="Price must be at least 20lv.!"
                                styles={style}
                            />
                            <p className="mt-2 font-bold">Adress:</p>
                            <Input
                                value={inputValue.city}
                                type="text"
                                name="city"
                                text="City"
                                onChangeInput={inputChangeHandler}
                                onValidity={inputValidation}
                                valid={isValid.city}
                                warning="This field must be filled!"
                                styles={style}
                            />
                            <Input
                                value={inputValue.street}
                                type="text"
                                name="street"
                                text="Address"
                                onChangeInput={inputChangeHandler}
                                onValidity={inputValidation}
                                valid={isValid.street}
                                warning="This field must be filled!"
                                styles={style}
                            />
                            <Input
                                value={inputValue.description}
                                type="textarea"
                                name="description"
                                text="Description"
                                onChangeInput={inputChangeHandler}
                                onValidity={inputValidation}
                                valid={isValid.description}
                                warning="This field must be filled!"
                                styles={style}
                            />
                            <button
                                type="submit"
                                className="group relative mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className="flex-grow">
                        <p className="ml-6 mt-10 font-bold">
                            Please, select coordinates for Google Map
                        </p>
                        <Map
                            name="ml-6 w-full map-container"
                            onSelectLocation={coordinatesChangeHandler}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewListingComponent;
