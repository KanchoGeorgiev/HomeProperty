import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WrapperCard from "../cards/WrapperCard";
import Map from "../UI/Map";

const ListingItemDetailComponent = () => {
    return (
        <WrapperCard>
            <div className="grid-row-2">
                <div className="grid grid-cols-2 gap-4 place-items-center">
                    <Carousel
                        useKeyboardArrows={true}
                        showStatus={false}
                        infiniteLoop={true}
                    >
                        <div>
                            <img src="/img/1.png" alt="1" />
                        </div>
                        <div>
                            <img src="/img/2.png" alt="2" />
                        </div>
                        <div>
                            <img src="/img/3.png" alt="3" />
                        </div>
                    </Carousel>
                    <div className="ml-4 place-self-stretch">
                        <Map name="map-container" />
                    </div>
                </div>
                <h3 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                </h3>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                </p>
            </div>
        </WrapperCard>
    );
};

export default ListingItemDetailComponent;
