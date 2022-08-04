import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../../UI/Map";
import Input from "../../UI/Input/Input";

const NewListingComponent = () => {
    const [inputValue, setInputValue] = useState({
        headline: "",
        area: 0,
        price: 0,
        city: "",
        address: "",
        lat: 0,
        lng: 0,
    });

    const [isValid, setIsValid] = useState({
        headline: false,
        area: false,
        price: false,
        city: false,
        address: false,
    });

    const style =
        "w-full block rounded-md border bordder-primary py-3 px-5 mt-3 bg-primary text-base";
    const navigate = useNavigate();
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (
            isValid.headline &&
            isValid.area &&
            isValid.price &&
            isValid.city &&
            isValid.address
        ) {
            console.log(inputValue);
            setIsValid({
                headline: false,
                area: false,
                price: false,
                city: false,
                address: false,
            });
            setInputValue({
                headline: "",
                area: 0,
                price: 0,
                city: "",
                address: "",
                lat: 0,
                lng: 0,
            });
            navigate("/home");
        }
    };

    const headlineChangeHandler = (data) => {
        setInputValue((prevState) => {
            return { ...prevState, headline: data };
        });
    };

    const headlineValidation = (data) => {
        setIsValid((prevValue) => {
            return { ...prevValue, headline: data };
        });
    };

    const areaChangeHandler = (data) => {
        setInputValue((prevState) => {
            return { ...prevState, area: data };
        });
    };

    const areaValidation = (data) => {
        setIsValid((prevValue) => {
            return { ...prevValue, area: data };
        });
    };

    const priceChangeHandler = (data) => {
        setInputValue((prevState) => {
            return { ...prevState, price: data };
        });
    };

    const priceValidation = (data) => {
        setIsValid((prevValue) => {
            return { ...prevValue, price: data };
        });
    };

    const cityChangeHandler = (data) => {
        setInputValue((prevState) => {
            return { ...prevState, city: data };
        });
    };

    const cityValidation = (data) => {
        setIsValid((prevValue) => {
            return { ...prevValue, city: data };
        });
    };
    const addressChangeHandler = (data) => {
        setInputValue((prevState) => {
            return { ...prevState, address: data };
        });
    };

    const addressValidation = (data) => {
        setIsValid((prevValue) => {
            return { ...prevValue, address: data };
        });
    };
    const coordinatesChangeHandler = (data1, data2) => {
        setInputValue((prevState) => {
            return { ...prevState, lat: data1, lng: data2 };
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
                                name="text"
                                text="Headline"
                                onChangeInput={headlineChangeHandler}
                                onValidity={headlineValidation}
                                valid={isValid.headline}
                                warning="This field must be filled!"
                                styles={style}
                            />

                            <Input
                                value={inputValue.area}
                                name="number"
                                text="Area"
                                onChangeInput={areaChangeHandler}
                                onValidity={areaValidation}
                                valid={isValid.area}
                                warning="This field must be filled!"
                                styles={style}
                            />

                            <input
                                id="imageBrowse"
                                type="file"
                                className="w-full rounded-md border bordder-primary mt-3 mb-9 bg-primary text-base"
                                multiple
                            />

                            <Input
                                value={inputValue.price}
                                name="number"
                                text="Price"
                                onChangeInput={priceChangeHandler}
                                onValidity={priceValidation}
                                valid={isValid.price}
                                warning="This field must be filled!"
                                styles={style}
                            />

                            <p className="mt-2 font-bold">Adress:</p>

                            <Input
                                value={inputValue.city}
                                name="text"
                                text="City"
                                onChangeInput={cityChangeHandler}
                                onValidity={cityValidation}
                                valid={isValid.city}
                                warning="This field must be filled!"
                                styles={style}
                            />

                            <Input
                                value={inputValue.address}
                                name="text"
                                text="Address"
                                onChangeInput={addressChangeHandler}
                                onValidity={addressValidation}
                                valid={isValid.address}
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
