import React from "react";
import ContactUs from "./ContactUs";
const EventPage = () => {
  return (
    <div className="flex flex-col justify-evenly">
      <div className="h-[1000px] w-[500px]"></div>
      <section id="intro" className="min-h-[100vh] min-w-svw">
        <ContactUs selector={"#intro"} />
      </section>
    </div>
  );

}

export default EventPage;