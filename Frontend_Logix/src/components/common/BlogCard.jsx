import React from "react";
import { Link } from "react-router-dom";  
const BlogCard = () => {
  return (
    <Link className="max-w-lg rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 lg:hover:scale-105 text-white">
      <img
        className="w-full"
        src="/images/Event/img7.jpeg" // Replace this with the correct image path
        alt="Blog Cover"
      />
      <div className=" py-4">
        <div className="font-bold text-xl mb-2 neon-slate-text">
          How to Build Strong Relationships in a Digital Age
        </div>
        <p className="text-gray-400 text-base">
          Aut omnis repudiandae et. Minima et deleniti et. Ut aut voluptatibus
          corporis aliquam in praesentium a officiis aut.
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;