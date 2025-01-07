import React from "react";
import Button from "../../common/button";
const ContactForm = () => {
  return (
    <>
      <div className="h-[93%]  w-[60%] border-2">
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
            className="w-[100%]  h-[95%] outline-none  bg-[rgb(51,51,51)] rounded-sm p-2"
          ></textarea>
        </div>
        <div className="p-2 flex flex-col items-start h-[50px] w-[100%] justify-start">
          <Button height="30px" width="130px" value="Submit"></Button>
        </div>
      </div>
    </>
  );
}

export default ContactForm;