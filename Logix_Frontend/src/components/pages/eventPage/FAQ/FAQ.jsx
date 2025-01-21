import React from "react";
import LearnMore from "./LearnMore";

const Faq = () => {
  return (
    <section className="h-[175vh] lg:h-[75vh]  w-[99vw] lg:w-[85vw] mt-10 flex flex-col lg:flex-row justify-evenly  bg-[#1b1c1d] rounded-lg items-center  ">
      <LearnMore></LearnMore>
      <div className="h-[80vh] w-[97vw] lg:w-[47%] lg:h-[70vh] border-2"></div>
    </section>
  );
}

export default Faq;