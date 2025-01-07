import React from "react";
import { Phone } from "lucide-react";

const CallButton = () => {
  const phoneNumber = "+918076917248";

  const handleCall = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Open the phone dialer on mobile devices
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert(
        "Phone calls can only be initiated on mobile devices."
      );
    }
  };

  return (
    <button
      onClick={handleCall}
      className="border-2 border-purple-300 text-purple-200 w-[105%] text-[15px]  h-16 lg:h-12 items-center font-semibold px-3 lg:px-1  rounded-sm shadow-md outline-none flex"
    >
      <Phone size={20} color="Wheat" strokeWidth={2} className="mr-2" />
      {phoneNumber}
    </button>
  );
};

export default CallButton;
