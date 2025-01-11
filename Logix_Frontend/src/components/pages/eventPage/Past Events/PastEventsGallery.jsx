import React from "react";
import { TextEffect } from "../../../motion-ui/TextEffect";
import useIntersectionObserver from "../../../Layout/useIntersectionObserver";
const PastEvents = ({selector}) => {
  const isIntersecting = useIntersectionObserver({ selector });
  return (
    <>
      {isIntersecting && (
        <div className="h-[160vh] w-[100%] border-2">
          <div className="h-[80vh] w-[90vw] lg:w-[75vw] flex flex-col justify-center items-center">
            <div className="bg-[#333] text-purple-300 neon-purple-text py-1 lg:py-0 px-4 rounded-xl flex justify-center items-center text-xl sm:text-3xl lg:text-lg mb-6  box-border motion-scale-in-[0.05] sm:motion-scale-in-[0.06] md:motion-scale-in-[0.08] lg:motion-translate-x-in-[-3%] motion-translate-y-in-[-4%] motion-duration-[4000ms] motion-delay-[100ms] lg:motion-translate-x-0 sm:translate-x-0 ">
              Visit our previous Events Gallery
            </div>
            <div className="text-[1.5rem] sm:text-3xl lg:text-4xl text-center mb-8 neon-neutral-text">
              <TextEffect
                per="char"
                delay={0.5}
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 },
                    },
                  },
                  item: {
                    hidden: { opacity: 0, rotateX: 90, y: 10 },
                    visible: {
                      opacity: 1,
                      rotateX: 0,
                      y: 0,
                      transition: { duration: 0.3 },
                    },
                  },
                }}
              >
                Relive the best moments from the Logix 2024 through vedios and photos in our gallery
              </TextEffect>
            </div>
          </div>

          <div className="flex flex-col justify-around items-center">

          </div>
        </div>
      )}
    </>
  );
}

export default PastEvents;