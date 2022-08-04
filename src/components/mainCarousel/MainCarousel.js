import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WrapperCard from "../cards/WrapperCard";

const MainCarousel = () => {
    const redirectHandelr = (e) => {
        console.log(e);
    };
    return (
        <WrapperCard>
            <p className="text-center text-6xl mb-4 font-semibold text-gray-800">
                Welcome to Home Property website
            </p>
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
                    <img src="/img/1.png" alt="1" />
                </div>
                <div>
                    <img src="/img/2.png" alt="2" />
                </div>
                <div>
                    <img src="/img/3.png" alt="3" />
                </div>
            </Carousel>
        </WrapperCard>
    );
};

export default MainCarousel;
