import React from "react";
import ContactUs from "./Contact Us/ContactUs";
import PastEvents from "./Past_Events/PastEventGallery/PastEventsGallery";
import Faq from "./FAQ/FAQ";
import EventBanner from "./EventBanner";
const EventPage = () => {
  return (
    <div className="flex flex-col items-center justify-evenly ">
      <EventBanner/>
      <Faq/>
      <PastEvents/>
      {/* <ContactUs/> */}
    </div>
  );
};

export default EventPage;
