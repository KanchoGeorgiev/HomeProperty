import React from "react";

const BackgroundCard = (props) => {
    return <div className="bg-stone-100 p-4 rounded-lg">{props.children}</div>;
};

export default BackgroundCard;
