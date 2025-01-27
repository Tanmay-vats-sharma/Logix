import React from 'react';

const BlogCard = ({ title, description, image }) => {
    return (
        <div
            className="shadow-md rounded-2xl overflow-hidden min-h-96"
          >
            <div className="relative group overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black">
                  <span className="text-md font-semibold text-black">View</span>
                </div>
              </div>
            </div>
            <div className="py-4 ">
              <h2 className="text-xl font-semibold mb-2">
                {title}
              </h2>
              <p className="text-sm text-[#7d7d7d]">{description}</p>
            </div>
          </div>
    );
};

export default BlogCard;