import {useState} from "react";

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
  }
  
  const handelCloseModel = () => {
    setIsModelOpen(false);
    setActiveEvent(null);
  };
  return (
    <>
      {ismodelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handelCloseModel}
        >
          <div
            className="bg-black rounded-lg p-4 w-full max-w-lg flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <img
              src={activeEvent.images[currentIndex]}
              alt={`${activeEvent.title} Slide ${currentIndex + 1}`}
              className="w-full h-auto object-contain cursor-pointer"
              onClick={handleNextImage} 
            />
          </div>
          <button
            onClick={handelCloseModel}
            className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default SliderModal;