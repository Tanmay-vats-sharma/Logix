import React from "react";
import CallButton from "./CallButton";
import AddressButton from "./AddressButton";
import Contactbg from "../../../../assets/contact-bg.png";
import SendMail from "./SendMail";

const ContactCard = () => {
  return (
    <>
      <div
        className="h-auto sm:h-[auto] lg:h-[397px] w-full sm:w-[75%] md:w-[70%] lg:w-[35%] rounded-xl bg-cover bg-center flex flex-col p-6 sm:p-4 md:p-8 lg:p-4"
        style={{ backgroundImage: `url(${Contactbg})` }}
      >
        <div className="flex flex-col justify-evenly mb-6 sm:mb-4">
          <div className="text-purple-300 text-4xl sm:text-3xl md:text-2xl lg:text-xl font-semibold ">
            Contact us
          </div>

          <div className="text-purple-400 text-lg sm:text-base ">
            Get in touch and let us know how we can help
          </div>
        </div>

        <div className="h-[70%] flex flex-col items-center justify-around space-y-6 sm:space-y-4 p-2">
          <SendMail />
          <CallButton />
          <AddressButton />
        </div>
      </div>
    </>
  );
};

export default ContactCard;
