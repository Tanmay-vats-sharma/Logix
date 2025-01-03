import React from "react";
import { TextEffect } from "../../motion-ui/TextEffect";
const ContactUs = () => {
  return (
    <>
      <section className="flex mt-16 p-1 flex-col items-center justify-evenly h-[calc(99vh-56px)]  w-svw ">
        <div className="bg-[#333] text-purple-400 h-7 w-56 rounded-xl flex justify-center items-center ">
          Contact the Logix Help Team
        </div>
        <div className="h-auto w-auto text-5xl">
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
      </section>
    </>
  );
};

export default ContactUs;
