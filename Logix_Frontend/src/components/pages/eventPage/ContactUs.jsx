import React from "react";
import Contactbg from "../../../assets/contact-bg.png"
import { TextEffect } from "../../motion-ui/TextEffect";
import SendMail from "./SendMail";
const ContactUs = () => {
  return (
    <>
      <section className="flex mt-16 p-1 flex-col items-center justify-evenly h-[100vh]  w-svw ">
        <div className="bg-[#333] text-purple-300 neon-purple-text h-7 w-56 rounded-xl flex justify-center items-center ">
          Contact the Logix Help Team
        </div>
        <div className="h-auto w-auto text-5xl neon-neutral-text">
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
        <div className="bg-[#1b1c1d] w-[63%] h-[70%] rounded-xl neon-neutral-shadow  flex justify-around items-center p-2">
          <div
            className="h-[90%] rounded-xl w-[35%] bg-cover bg-center flex flex-col  p-4  "
            style={{ backgroundImage: `url(${Contactbg})` }}
          >
            <div className="flex flex-col justify-evenly ">
              <div className="text-purple-300 text-xl font-semibold">
                Contact us
              </div>

              <div className="text-purple-400 ">
                Get in touch and let us know how we can help
              </div>
            </div>
            <div className="border-2 h-[80%] flex flex-col items-center justify-center p-2">
              <SendMail></SendMail>
            </div>
          </div>

          <div className="h-[90%]  w-[60%]"></div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
