import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WrapperCard from "../cards/WrapperCard";
import background from "../../img/Background.jpg";
import SearchMenu from "../UI/SearchMenu";

const MainCarousel = () => {
    const redirectHandelr = (e) => {
        console.log(e);
    };
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
                    <Carousel
                        useKeyboardArrows={true}
                        showThumbs={false}
                        showIndicators={false}
                        showStatus={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        onClickItem={redirectHandelr}
                    >
                        <div>
                            <img
                                src="https://ap.rdcpix.com/1fd95bb9c529e22d545d9c9c9d89a7e5l-m1511124772od-w480_h360_x2.webp"
                                alt="1"
                            />
                        </div>
                        <div>
                            <img src="/img/2.png" alt="2" />
                        </div>
                        <div>
                            <img src="/img/3.png" alt="3" />
                        </div>
                    </Carousel>
                </div>
            </WrapperCard>
        </>
    );
};

export default MainCarousel;
