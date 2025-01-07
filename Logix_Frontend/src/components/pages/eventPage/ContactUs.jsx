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
        <div className="flex mt-16 p-1 flex-col items-center justify-evenly h-[100vh] w-[100%]  motion-scale-in-[0.04] lg:motion-translate-x-in-[-3%] motion-translate-y-in-[-4%] motion-duration-[2000ms] motion-delay-[1000ms] motion-delay-[0ms]/scale motion-delay-[0ms]/translate">
          <div className="bg-[#333] text-purple-300 neon-purple-text h-[auto] lg:h-7 lg:py-1 px-3 rounded-xl flex justify-center items-center text-3xl lg:text-lg">
            Contact the Logix Help Team
          </div>
          <div className="h-auto w-auto  text-3xl md:text-4xl lg:text-5xl neon-neutral-text">
            <TextEffect
              per="char"
              delay={0.5}
              variants={{
                container: {
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    rotateX: 90,
                    y: 10,
                  },
                  visible: {
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    transition: {
                      duration: 0.2,
                    },
                  },
                },
              }}
            >
              We are here when you need us
            </TextEffect>{" "}
          </div>
          <div
            className="bg-[#1b1c1d] w-full lg:w-full  h-[100%] lg:h-[70%] rounded-xl neon-neutral-shadow  flex flex-col lg:flex-row justify-around items-center lg:p-2"
          >
            <ContactCard></ContactCard>
            <ContactForm></ContactForm>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;
