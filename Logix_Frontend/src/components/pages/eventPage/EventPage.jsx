import React from "react";
import ContactUs from "./Contact Us/ContactUs";
import PastEvents from "./Past Events/PastEventsGallery";
const EventPage = () => {
  return (
    <div className="flex flex-col items-center justify-evenly">
      <div className="h-[1000px] w-[500px]"></div>
      <PastEvents></PastEvents>
      <section id="intro" className="min-h-[100vh] max-w-[100vw]">
        <ContactUs selector={"#intro"} />
      </section>
    </div>
  );
};

export default EventPage;
