import React from "react";
import ContactUs from "./Contact Us/ContactUs";
import PastEvents from "./Past_Events/PastEventGallery/PastEventsGallery";
import Faq from "./FAQ/FAQ";
const EventPage = () => {
  return (
    <div className="flex flex-col items-center justify-evenly ">
      <div className="h-[1000px] w-full"></div>
      <Faq/>
      <PastEvents/>
      <ContactUs/>
    </div>
  );
};

export default EventPage;
