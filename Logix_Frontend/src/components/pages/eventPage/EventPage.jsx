import React from "react";
import ContactUs from "./Contact Us/ContactUs";
const EventPage = () => {
  return (
    <div className="flex flex-col items-center justify-evenly">
      <div className="h-[1000px] w-[500px]"></div>
      <section id="intro" className="min-h-[100vh] max-w-[100vw]">
        <ContactUs selector={"#intro"} />
      </section>
    </div>
  );
};

export default EventPage;
