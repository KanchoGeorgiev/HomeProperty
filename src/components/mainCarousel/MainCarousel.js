import React, { useContext, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WrapperCard from "../cards/WrapperCard";
import background from "../../img/Background.jpg";
import SearchMenu from "../UI/SearchMenu";
import ListingContext from "../../contexts/ListingContext";

const MainCarousel = () => {
    const { filteredListings, search } = useContext(ListingContext);
    const lastThree = [
        filteredListings[filteredListings.length - 1],
        filteredListings[filteredListings.length - 2],
        filteredListings[filteredListings.length - 3],
    ];
  
    useEffect(() => {
        search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                style={{ backgroundImage: `url(${background})` }}
                className="bg-opacity-50"
            >
                <p className="text-center text-6xl mb-4 font-semibold text-gray-800 p-6 stroke">
                    Welcome to Home Property website
                </p>
                <WrapperCard>
                    <div className="p-10">
                        <SearchMenu color="bg-gray-900" />
                    </div>
                </WrapperCard>
            </div>
            <WrapperCard>
                <div className="w-2/3 mx-auto">
                    <p className="text-2xl mb-4 mt-8 font-semibold text-gray-800">
                        Latest Listings:
                    </p>
                    {filteredListings.length>0 && (
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
                                    <div key={x.id}>
                                        <img src={x.image} alt={x.headline} />
                                    </div>
                                );
                            })}
                        </Carousel>
                    )}
                </div>
            </WrapperCard>
        </>
    );
};

export default MainCarousel;
