import React from "react";
import Dots from "../../assets/dots7.png";

const Dotsbox = () => {
  return (
    <div className="fixed h-svh flex w-svw flex-col z-[-1]">
      <div className="relative w-full p-10 h-full flex justify-start items-start">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat h-28 w-52 top-28  left-10  motion-translate-x-loop-[6%] motion-translate-y-loop-[0%] motion-duration-[3500ms] motion-ease-linear"
          style={{ backgroundImage: `url(${Dots})` }}
        ></div>
      </div>
      <div className="relative w-svw p-10 h-full ">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat  h-28 w-52 top-28  left-auto right-16 motion-translate-x-loop-[7%] motion-translate-y-loop-[0%] motion-duration-[3700ms] motion-ease-linear"
          style={{ backgroundImage: `url(${Dots})` }}
        ></div>
      </div>
    </div>
  );
};

export default Dotsbox;
