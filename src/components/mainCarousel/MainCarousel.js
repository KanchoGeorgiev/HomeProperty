import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListingContext from "../../contexts/ListingContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WrapperCard from "../cards/WrapperCard";
import SearchMenu from "../UI/SearchMenu";
import background from "../../img/Background.jpg";
import BackgroundCard from "../cards/BackgroundCard";

const MainCarousel = () => {
    const { filteredListings, search } = useContext(ListingContext);
    const navigate = useNavigate();
    let lastThree = [];
    if (filteredListings.length < 4) {
        lastThree = filteredListings;
    } else {
        lastThree = [
            filteredListings[filteredListings.length - 1],
            filteredListings[filteredListings.length - 2],
            filteredListings[filteredListings.length - 3],
        ];
    }

    useEffect(() => {
        search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickHandler = (id) => {
        navigate(`/listings/${id}`);
    };
    return (
        <>
            <div
                style={{ backgroundImage: `url(${background})` }}
                className="bg-opacity-50"
            >
                <p className="text-center text-5xl font-semibold text-neutral-800 p-4 stroke">
                    Welcome to Home Property website
                </p>

                <p className="text-8xl text-center stroke font-semibold text-neutral-800 pb-4">
                    MEET YOUR NEW HOME
                </p>
            </div>
            <WrapperCard>
                <BackgroundCard>
                    <div className="flex justify-center">
                        <div className="flex-1">
                            <SearchMenu type="1" />
                        </div>
                        <div className="w-1/2">
                            {filteredListings.length > 0 && (
                                <Carousel
                                    useKeyboardArrows={true}
                                    showThumbs={false}
                                    showIndicators={false}
                                    showStatus={false}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                >
                                    {lastThree.map((x) => {
                                        return (
                                            <div
                                                key={x.id}
                                                onClick={() =>
                                                    clickHandler(x.id)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <img
                                                    src={x.image}
                                                    alt={x.headline}
                                                />
                                            </div>
                                        );
                                    })}
                                </Carousel>
                            )}
                        </div>
                    </div>
                </BackgroundCard>
            </WrapperCard>
        </>
    );
};

export default MainCarousel;
