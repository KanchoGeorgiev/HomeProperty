import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = (props) => {
    const center = {
        lat: props.lat ? props.lat : 42.6903,
        lng: props.lng ? props.lng : 23.405,
    };
    const clickHandler = (e) => {
        props.onSelectLocation(e.latLng.lat(), e.latLng.lng());
    };
    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName={props.name}
            onClick={props.onSelectLocation ? clickHandler : undefined}
        >
            <Marker position={center} />
        </GoogleMap>
    );
};

export default Map;
