import React from "react";

const WrapperCard = (props) => {
    return <div className="w-2/3 mx-auto mt-4">{props.children}</div>;
};

export default WrapperCard;
