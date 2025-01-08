import React from "react";
import { Mail } from "lucide-react";

const SendMail = () => {
  const email = "tanmaysharmats36@gmail.com";
  const subject = encodeURIComponent("Write your subject here.");
  const body = encodeURIComponent("Share your thoughts with us...");

  const handleSendMail = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const mailToLink = `mailto:${email}?subject=${subject}&body=${body}`;
      window.location.href = mailToLink;
    } else {
      const mailToLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email
      )}&su=${subject}&body=${body}`;
      window.open(mailToLink, "_blank");
    }
  };

  return (
    <button
      onClick={handleSendMail}
      className="border-2 border-purple-300 text-purple-200 w-[105%] text-[18px] lg:text-[12px] h-16 lg:h-12 items-center font-semibold px-4 rounded-sm shadow-md outline-none flex"
    >
      <Mail size={20} color="violet" strokeWidth={2} className="mr-2" />
      {email}
    </button>
  );
};

export default SendMail;
