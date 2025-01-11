import React from "react";
import ContactUs from "./Contact Us/ContactUs";
import PastEvents from "./Past Events/PastEventsGallery";
const EventPage = () => {
  return (
    <div className="flex flex-col items-center justify-evenly ">
      <div className="h-[1000px] w-full"></div>
      <section id="pastEvents" className="min-h-[100vh] max-w-[100vw] mt-10">
        <PastEvents selector={"#pastEvents"}></PastEvents>
      </section>

      <section id="intro" className="min-h-[100vh] max-w-[100vw] mt-10">
        <ContactUs selector={"#intro"} />
      </section>
    </div>
  );
};

export default EventPage;
