import React from "react";
import LearnMore from "./LearnMore";
import Ques from "./Ques";

const Faq = () => {
  return (
    <section className="h-[110vh] lg:h-[75vh]  w-[99vw] lg:w-[85vw] mt-10 flex flex-col lg:flex-row justify-evenly lg:justify-evenly  bg-[#1b1c1d] rounded-lg items-center  overflow-hidden">
      <LearnMore></LearnMore>
      <Ques></Ques>
    </section>
  );
};

export default Faq;
