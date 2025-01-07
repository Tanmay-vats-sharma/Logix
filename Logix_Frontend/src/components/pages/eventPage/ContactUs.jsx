import React from "react";
import { TextEffect } from "../../motion-ui/TextEffect";
import useIntersectionObserver from "../../Layout/useIntersectionObserver";
import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";

const ContactUs = ({ selector }) => {
  const isIntersecting = useIntersectionObserver({ selector });

  return (
    <>
      {isIntersecting && (
        <div className="flex flex-col items-center justify-start lg:justify-center h-auto w-full max-w-screen-md  lg:max-w-full px-4 py-10 box-border motion-scale-in-[0.05] sm:motion-scale-in-[0.06] md:motion-scale-in-[0.08] lg:motion-translate-x-in-[-3%] motion-translate-y-in-[-4%] motion-duration-[2000ms] motion-delay-[1000ms] lg:motion-translate-x-0 sm:translate-x-0 border-2">
          <div className="bg-[#333] text-purple-300 neon-purple-text py-2 px-4 rounded-xl flex justify-center items-center text-2xl sm:text-3xl lg:text-lg mb-6">
            Contact the Logix Help Team
          </div>

          <div className="text-2xl sm:text-4xl lg:text-5xl text-center mb-8 neon-neutral-text">
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
                    transition: { duration: 0.2 },
                  },
                },
              }}
            >
              We are here when you need us
            </TextEffect>
          </div>

          <div className="bg-[#1b1c1d] w-[90%] sm:w-[80%] md:w-[70%] lg:w-full max-w-screen-lg rounded-xl neon-neutral-shadow flex flex-col lg:flex-row items-center justify-center gap-6 p-6 min-h-[90%] h-auto overflow-hidden">
            <ContactCard />
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;
