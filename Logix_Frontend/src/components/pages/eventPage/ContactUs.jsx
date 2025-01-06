import React from "react";
import Contactbg from "../../../assets/contact-bg.png"
import { TextEffect } from "../../motion-ui/TextEffect";
import SendMail from "./SendMail";
import useIntersectionObserver from "../../Layout/useIntersectionObserver";
import CallButton from "./CallButton";
import AddressButton from "./AddressButton";
import Button from "../../common/button";
const ContactUs = ({ selector }) => {
  const isIntersecting = useIntersectionObserver({ selector });

  return (
    <>
      {isIntersecting && (
        <div className="flex mt-16 p-1 flex-col items-center justify-evenly h-[100vh] w-svw  motion-scale-in-[0.04] motion-translate-x-in-[-3%] motion-translate-y-in-[-4%] motion-duration-[2000ms] motion-delay-[1000ms] motion-delay-[0ms]/scale motion-delay-[0ms]/translate">
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
              <div className=" h-[80%] flex flex-col items-center justify-around p-2">
                <SendMail></SendMail>
                <CallButton></CallButton>
                <AddressButton></AddressButton>
              </div>
            </div>

            <div className="h-[93%]  w-[60%] ">
              <div className="h-20 w-[100%]  flex">
                <div className="w-[50%] h-[100%]  flex flex-col p-2 ">
                  <label className="text-[17px] text-purple-300 mb-[3px] neon-purple-text">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    className="w-[80%] outline-none  bg-[rgb(51,51,51)] rounded-sm px-2 h-8"
                  />
                </div>
                <div className="w-[50%] h-[100%]  flex flex-col p-2 ">
                  <label className="text-[17px] text-purple-300 mb-[3px] neon-purple-text">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    className="w-[80%] outline-none  bg-[rgb(51,51,51)] rounded-sm px-2 h-8"
                  />
                </div>
              </div>
              <div className="h-20 w-[100%] flex">
                <div className="w-[50%] h-[100%]  flex flex-col p-2 ">
                  <label className="text-[17px] text-purple-300 mb-[3px] neon-purple-text">
                    Email Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    className="w-[80%] outline-none  bg-[rgb(51,51,51)] rounded-sm px-2 h-8"
                  />
                </div>
                <div className="w-[50%] h-[100%]  flex flex-col p-2 ">
                  <label className="text-[17px] text-purple-300 mb-[3px] neon-purple-text">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Your Subject"
                    className="w-[80%] outline-none  bg-[rgb(51,51,51)] rounded-sm px-2 h-8"
                  />
                </div>
              </div>
              <div className="h-40 w-[100%] p-2 flex flex-col">
                <label className="text-[17px] text-purple-300 mb-[3px] neon-purple-text">
                  Comment
                </label>
                <textarea
                  name=""
                  id=""
                  placeholder="Your Comment"
                  className="w-[100%]  h-[90%] outline-none  bg-[rgb(51,51,51)] rounded-sm p-2"
                ></textarea>
              </div>
              <div className="p-2 flex flex-col items-start h-[50px] w-[100%] justify-start">
                <Button height="35px" width="150px" value="Submit"></Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;
