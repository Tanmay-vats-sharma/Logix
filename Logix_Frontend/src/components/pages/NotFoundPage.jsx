import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import GIF from "../../assets/404.gif"

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <section className="page_404 text-white font-serif py-10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-[99vh] w-[95vw]">
          <h1 className="text-8xl text-white neon-purple-text">404</h1>
          <div className="four_zero_four_bg bg-center bg-no-repeat bg-cover h-[52%] w-[50%] flex items-center justify-center z-0" 
               style={{ backgroundImage: `url(${GIF})` }}>
          </div>

          <div className="flex flex-col items-center justify-center text-center mt-12">
            <h3 className="text-4xl mb-4 neon-purple-text">Look like you're lost</h3>
            <p className="mb-4 neon-purple-text">The page you are looking for is not available!</p>
            <Button 
              onClick={handleGoHome}
              height="40px" width="150px" value="Go to Home" className="link_404 text-white  px-4 py-2 rounded-md hover:bg-green-70 text-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
