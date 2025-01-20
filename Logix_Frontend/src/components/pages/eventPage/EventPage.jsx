import React from "react";
import ContactUs from "./Contact Us/ContactUs";
import PastEvents from "./Past Events/PastEventsGallery";
import PopularEvent from "./Past Events/Popular Event/PopularEvent";
const EventPage = () => {
  return (
    <div className="flex flex-col items-center justify-evenly ">
      <div className="h-[1000px] w-full"></div>
      <PopularEvent />
      <PastEvents/>
      <ContactUs/>
    </div>
  );
};

export default EventPage;
