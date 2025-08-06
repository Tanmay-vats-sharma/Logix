import React from "react";
import Button from "../../../common/Button"
import useObserver from "../../../Layout/useObserver";
import { useNavigate } from "react-router-dom";
const LearnMore = () => {
  const block = useObserver({ once: false });
  const event = "Code Clashers"
  const navigate = useNavigate();
  return (
    <div ref={block.ref} className="h-[60vh] w-[97vw] lg:w-[47%] lg:h-[70vh] ">
      {block.isVisible && (
        <div className="h-[100%] w-[100%] lg:w-[100%] lg:h-[100%]  flex flex-col justify-around p-4 motion-translate-x-in-[-25%] motion-translate-y-in-[0%]  motion-delay-[0ms]/translate motion-ease-linear motion-opacity-in-[0%] motion-duration-[800ms] motion-delay-[100ms] motion-duration-[1900ms]/opacity motion-delay-[0ms]/opacity ">
          <div className="text-3xl lg:text-4xl neon-slate-text text-wrap h-[20%] w-[98%] ">
            Frequently asked questions, about the {event}.
          </div>
          <div className="text-md sm:text-lg text-wrap h-[45%] lg:w-[95%] py-3 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              maiores optio quisquam. Saepe tempora vel corrupti rerum rem
              soluta sit perspiciatis et ducimus libero numquam, quia id, sunt,
              perferendis aut....
            </p>
          </div>
          <div className="h-[10%] lg:h-[10%]">
            <Button value="Learn More" className="text-xl h-10 w-36 lg:w-40" onClick={() => {navigate("/event-details")}}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearnMore;