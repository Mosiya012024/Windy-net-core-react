import React, { useState } from "react";
import GooglePlacesAPI from "./GooglePlacesAPI";
import Map from "./Map";

function GoogleAPI() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GooglePlacesAPI setSelectedLocation={setSelectedLocation} />
      <Map selectedLocation={selectedLocation} />
    </div>
  );
}

export default GoogleAPI;