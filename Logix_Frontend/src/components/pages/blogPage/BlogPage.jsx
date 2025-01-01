import React from 'react';
import Intro from './Intro';

const BlogPage = () => {
    return (
        <div className='h-full flex flex-col items-center mt-8 '>
            <Intro/>
            {/* <h1 className='neon-purple-text text-9xl'>Blog Page</h1> */}
            {/* <p className='neon-red-text'>Welcome to the blog page!</p> */}
        </div>
    );
};

export default BlogPage;