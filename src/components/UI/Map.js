import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = (props) => {
    const [position, setPosition] = useState({
        lat: 42.6903,
        lng: 23.405,
    });

    useEffect(() => {
        if (props.lat) {
            setPosition({
                lat: props.lat,
                lng: props.lng,
            });
        } else {
            setPosition({
                lat: 42.6903,
                lng: 23.405,
            });
        }
    }, [props.lat, props.lng]);
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
