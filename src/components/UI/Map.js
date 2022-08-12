import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = (props) => {
    const [position, setPosition] = useState({
        lat: props.lat ? props.lat : 42.6903,
        lng: props.lng ? props.lng : 23.405,
    });
    const clickHandler = (e) => {
        props.onSelectLocation(e.latLng.lat(), e.latLng.lng());
        setPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };
    return (
        <GoogleMap
            zoom={10}
            center={position}
            mapContainerClassName={props.name}
            onClick={props.onSelectLocation ? clickHandler : undefined}
        >
            <Marker position={position} />
        </GoogleMap>
    );
};

export default Map;
