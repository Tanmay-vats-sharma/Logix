import React from "react";
import { TextEffect } from "../../../motion-ui/TextEffect";
import useObserver from "../../../Layout/useObserver";
import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";

const ContactUs = () => {
  const { ref, isVisible } = useObserver({ once: false });

  return (
    <section ref={ref} className="min-h-[100vh] max-w-[100vw] mt-10">
      {isVisible && (
        <div className="flex flex-col items-center justify-evenly lg:justify-center h-auto w-[100%] sm:w-[63vw] max-w-screen-sm md:max-w-screen-md lg:max-w-full px-4 py-10 ">
          <div className="bg-[#333] text-purple-300 neon-purple-text py-1 lg:py-0 px-4 rounded-xl flex justify-center items-center text-xl sm:text-3xl lg:text-lg mb-6  box-border motion-scale-in-[0.05] sm:motion-scale-in-[0.06] md:motion-scale-in-[0.08] lg:motion-translate-x-in-[-3%] motion-translate-y-in-[-4%] motion-duration-[4000ms] motion-delay-[100ms] lg:motion-translate-x-0 sm:translate-x-0 ">
            Contact the Logix Help Team
          </div>

          <div className="text-[1.5rem] sm:text-4xl lg:text-5xl text-center mb-8 neon-neutral-text">
            <TextEffect
              per="char"
              delay={0.5}
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                },
                item: {
                  hidden: { opacity: 0, rotateX: 90, y: 10 },
                  visible: {
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    transition: { duration: 0.3 },
                  },
                },
              }}
            >
              We are here when you need us
            </TextEffect>
          </div>

          <div className="  bg-[#1b1c1d] w-[97%] sm:w-[95%] md:w-[70%] lg:w-full max-w-screen-lg rounded-xl neon-neutral-shadow flex flex-col lg:flex-row items-center justify-center gap-8 p-2 sm:p-6 lg:gap-6 lg:p-6 min-h-[90%] h-auto overflow-hidden  box-border motion-translate-x-in-[0%] motion-translate-y-in-[20%] motion-opacity-in-[0%] motion-duration-[2000ms] motion-delay-[100ms] motion-delay-[0ms]/translate motion-duration-[3000ms]/opacity motion-delay-[100ms]/opacity motion-ease-linear">
            <ContactCard />
            <ContactForm />
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactUs;
