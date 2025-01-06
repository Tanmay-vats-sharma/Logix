import React from "react";
import { MapPin } from "lucide-react";

const AddressButton = () => {
  const address = "Taj Mahal, Agra, India"; 

  const handleOpenMaps = () => {
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(mapsLink, "_blank");
  };

  return (
    <button
      onClick={handleOpenMaps}
      className="border-2 border-purple-300 text-purple-200 w-[105%] text-[15px] h-12 items-center font-semibold px-1 rounded-sm shadow-md outline-none flex"
    >
      <MapPin size={20} color="Wheat" strokeWidth={2} className="mr-2" />
      {address}
    </button>
  );
};

export default AddressButton;
