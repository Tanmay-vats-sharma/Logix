import React, { useEffect } from "react";
import Contactbg from "../../../assets/contact-bg.png";
import { TextEffect } from "../../motion-ui/TextEffect";
import SendMail from "./SendMail";

const ContactUs = () => {
  useEffect(() => {
    const animatedDiv = document.getElementById("animatedDiv");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animatedDiv.classList.add(
              "scale-100",
              "opacity-100",
              "max-h-[100vh]",
              "max-w-[100vw]"
            );
          } else {
            animatedDiv.classList.remove(
              "scale-100",
              "opacity-100",
              "max-h-[100vh]",
              "max-w-[100vw]"
            );
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (animatedDiv) observer.observe(animatedDiv);

    return () => {
      if (animatedDiv) observer.unobserve(animatedDiv);
    };
  }, []);

  return (
    <>
      
    <div
      id="animatedDiv"
      className="flex mt-16 p-1 flex-col items-center justify-evenly group
      scale-95 opacity-0 max-h-0 max-w-0 transform-gpu transition-all duration-[1000ms] delay-300 ease-in-out overflow-hidden "
    >
      <div className="bg-[#333]  text-purple-300 neon-purple-text h-7 w-56 rounded-xl flex justify-center items-center mb-8">
        Contact the Logix Help Team
      </div>
      <div className="h-auto w-auto text-5xl neon-neutral-text mb-10">
        <TextEffect
          per="char"
          delay={0.6}
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
                  duration: 0.1,
                },
              },
            },
          }}
        >
          We are here when you need us
        </TextEffect>
      </div>
      <div className="bg-[#1b1c1d] h-[70vh] w-[65vw] rounded-xl neon-neutral-shadow flex justify-around items-center p-2">
        <div
          className="h-[90%] rounded-xl w-[35%] bg-cover bg-center flex flex-col p-4"
          style={{ backgroundImage: `url(${Contactbg})` }}
        >
          <div className="flex flex-col justify-evenly">
            <div className="text-purple-300 text-xl font-semibold">
              Contact us
            </div>
            <div className="text-purple-400">
              Get in touch and let us know how we can help
            </div>
          </div>
          <div className="h-[80%] flex flex-col items-center justify-center p-2">
            <SendMail />
          </div>
        </div>
        <div className="h-[90%] w-[60%]"></div>
      </div>
      </div>
      </>
  );
};

export default ContactUs;
