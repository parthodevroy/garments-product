import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useLoaderData } from "react-router";

// Marker icon fix (Leaflet default icon problem with React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const Covarage = () => {
    const survices=useLoaderData()
    const mapRef=useRef(null)

  // Map-এর কেন্দ্র (default)
  const defaultPosition = [23.8103, 90.4125]; // Dhaka, Bangladesh

  
  const sercemap=(e)=>{
    e.preventDefault()
    const location=e.target.location.value
    const district=survices.find(c=>c.district.toLowerCase().includes(location.toLowerCase()))

if (district) {
    const decod=[district.latitude, district.longitude]
    mapRef.current.flyTo(decod,14)
    
}
  }

  return (
    
    
    <div className="w-full pl-6 h-[600px] md:h-[700px]">
        <h1 className="text-2xl text-black">Total 64 District</h1>
        {/* serce */}

        <form onSubmit={sercemap} className="p-3 flex items-center gap-3">
  <label className="input input-bordered flex items-center gap-2 w-full">
    <svg
      className="h-5 w-5 opacity-70"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>

    <input
      type="search"
      name="location"
      placeholder="Search district name..."
      className="grow"
      required
    />
  </label>

  <button className="btn btn-neutral">Search</button>
</form>

      <MapContainer
        center={defaultPosition}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {survices.map((loc) => (
          <Marker key={loc.id} position={[loc.latitude,loc.longitude]}>
            <Popup><strong>{loc.district}</strong>
            Service Area::{loc.covered_area.join(', ')}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Covarage;
