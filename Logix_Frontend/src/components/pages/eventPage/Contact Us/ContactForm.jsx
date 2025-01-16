import React from "react";
import Button from "../../../common/Button";
const ContactForm = () => {
  return (
    <>
      <div className="lg:h-[93%] h-auto lg:w-[60%]">
        <div className="h-30 lg:h-20 w-[100%]  flex flex-col lg:flex-row">
          <div className="w-[80%] lg:w-[50%] h-[100%]  flex flex-col p-2 ">
            <label className="text-[25px] lg:text-[19px] text-purple-300 mb-[3px] neon-purple-text">
              First Name
            </label>
            <input
              type="text"
              placeholder="Your first name"
              className="w-[100%] lg:w-[80%] outline-none text-[20px] lg:text-[16px]  bg-[rgb(51,51,51)] rounded-sm px-2 h-10 lg:h-8"
            />
          </div>
          <div className="w-[80%] lg:w-[50%] h-[100%]  flex flex-col p-2 ">
            <label className="text-[25px] lg:text-[19px] text-purple-300 mb-[3px] neon-purple-text">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Your last name"
              className="w-[100%] lg:w-[80%] outline-none text-[20px] lg:text-[16px]  bg-[rgb(51,51,51)] rounded-sm px-2 h-10 lg:h-8"
            />
          </div>
        </div>
        <div className="h-30 lg:h-20 w-[100%] flex flex-col lg:flex-row">
          <div className="w-[80%] lg:w-[50%] h-[100%]  flex flex-col p-2 ">
            <label className="text-[25px] lg:text-[19px] text-purple-300 mb-[3px] neon-purple-text">
              Email Address
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className=" w-[100%] lg:w-[80%] outline-none  bg-[rgb(51,51,51)] text-[20px] lg:text-[16px] rounded-sm px-2 h-10 lg:h-8"
            />
          </div>
          <div className="w-[80%] h-[100%]  flex flex-col p-2 ">
            <label className="text-[25px] lg:text-[19px] text-purple-300 mb-[3px] neon-purple-text">
              Subject
            </label>
            <input
              type="text"
              placeholder="Your Subject"
              className="w-[100%] lg:w-[80%] outline-none text-[20px] lg:text-[16px]  bg-[rgb(51,51,51)] rounded-sm px-2 h-10 lg:h-8"
            />
          </div>
        </div>
        <div className="h-64 lg:h-40 w-[100%] p-2 flex flex-col">
          <label className="text-[25px] lg:text-[19px] text-purple-300 mb-[3px] neon-purple-text">
            Comment
          </label>
          <textarea
            name=""
            id=""
            placeholder="Your Comment"
            className="w-[100%] h-[100%] lg:h-[95%] outline-none text-[23px] lg:text-[16px]   bg-[rgb(51,51,51)] rounded-sm p-2"
          ></textarea>
        </div>
        <div className="p-2 flex flex-col items-start lg:h-[50px] w-[100%] justify-start">
          <Button height="30px" width="130px" value="Submit"></Button>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
