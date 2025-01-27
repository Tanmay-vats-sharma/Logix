import React from "react";
import BlogCard from "../../common/BlogCard";

const BlogCardGrid = () => {
  const blogs = [
    {
      id: 1,
      title: "Exploring React",
      description: "Learn the fundamentals of React and how to build interactive UIs.",
      image: "/images/Event/img1.jpeg",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      description: "Create beautiful designs effortlessly with Tailwind CSS.",
      image: "/images/Event/img2.jpeg",
    },
    {
      id: 3,
      title: "JavaScript Deep Dive",
      description: "Understand JavaScript concepts with practical examples.",
      image: "/images/Event/img3.jpeg",
    },
    {
      id: 4,
      title: "Full-Stack Development",
      description: "Learn how to build and deploy full-stack web applications.",
      image: "/images/Event/img4.jpeg",
    },
  ];

  return (
    <div className="w-screen h-auto p-4 flex items-center justify-center ">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-5xl">
        {blogs.map((blog) => (
            <BlogCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
            />
        ))}
      </div>
    </div>
  );
};


export default BlogCardGrid;
