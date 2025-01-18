import { useState } from "react";
import Button from "../../../common/Button";

const SliderModal = ({
  ismodelOpen,
  setIsModelOpen,
  activeEvent,
  setActiveEvent,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  if (!ismodelOpen || !activeEvent) return null;

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeEvent.images.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEnd = e.touches[0].clientX;
    if (touchStart - touchEnd > 50) {
      handleNextImage();
      setTouchStart(null);
    }
  };

  const handelCloseModel = () => {
    setIsModelOpen(false);
    setActiveEvent(null);
    document.getElementById("content").classList.remove("pointer-events-none");
  };

  return (
    <>
      {ismodelOpen && (
        <div
          id="content"
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
        >
          <div
            className="h-[auto] w-[auto] lg:h-[80vh] bg-black neon-neutral-shadow rounded-lg max-w-lg flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <img
              src={activeEvent.images[currentIndex]}
              alt={`${activeEvent.title} Slide ${currentIndex + 1}`}
              className="w-full h-full neon-neutral-shadow object-contain cursor-pointer rounded-lg"
              onClick={handleNextImage}
            />
          </div>

          <Button
            onClick={handelCloseModel}
            value="close"
            height="35px"
            width="100px"
            className="absolute top-4 right-4 text-xl"
          ></Button>
        </div>
      )}
    </>
  );
};

export default SliderModal;
