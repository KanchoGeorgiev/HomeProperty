import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "../UI/Map";
import WrapperCard from "../cards/WrapperCard";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactsBody = () => {
    const { isLoading } = useLoadScript({
        googleMapsApiKey: "AIzaSyD22JxMtwkPmFH1R094mngLopf8zJ-vZ2k",
    });

    if (isLoading) {
        return <div> Loading...</div>;
    } else {
        return (
            <WrapperCard>
                <div className="flex">
                    <Map name="w-3/5 map-container" />
                    <div className="w-2/5 break-all bg-gray-600">
                        <h1 className="text-white text-3xl text-center mt-6">
                            Contacts
                        </h1>
                        <p className="text-white m-4">
                            Please, feel free to contact us regarding anything
                            related to this website or any of the listings
                            posted in it.
                        </p>
                        <p className="text-white m-4">
                            Work hours: Mon-Fri
                        </p>
                        <p className="text-white m-4">
                            08:00-20:00
                        </p>

                        <ul className="text-white mx-4 mt-10 text-2xl">
                            <li>
                                <div className="my-4">
                                    <FaPhone className="inline align-baseline h-4" />{" "}
                                    0887682321
                                </div>
                            </li>
                            <li>
                                <div className="my-4">
                                    <FaEnvelope className="inline align-baseline h-4" />{" "}
                                    sssddd@abv
                                </div>
                            </li>
                            <li>
                                <div className="my-4">
                                    <FaMapMarkerAlt className="inline align-baseline h-4" />{" "}
                                    Bulgaria, Sofia, Ivan Vazov bul. 43
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </WrapperCard>
        );
    }
};

export default ContactsBody;
