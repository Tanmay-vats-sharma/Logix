import React from "react";

const SliderModal = ({ ismodelOpen, setIsModelOpen }) => {
  const handelCloseModel = () => {
    setIsModelOpen(false);
  }; 
  return (
    <>
      {ismodelOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 hidden0px]  bg-black  ">
          <div className="bg-white w-[90%] sm:w-[75%] md:w-[50%] lg:w-[40%] p-6 rounded-lg shadow-lg transform transition-all scale-95 text-black">
            <button onClick={handelCloseModel}>close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderModal;