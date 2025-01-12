import React from 'react';
import Intro from './Intro';
import SubscribeCTA from './SubscribeCTA';
import SearchPaginator from './SearchPaginator';
import BlogCardGrid from './BlogCardGrid';

const BlogPage = () => {
    return (
        <div className=' flex flex-col items-center mt-8 gap-12 '>
            <Intro/>
            <SearchPaginator/>
            {/* <BlogCardGrid /> */}
            {/* FeaturedBlogs (Optional) */}
            {/* PopularBlogs (Optional) */}
            <SubscribeCTA/>
        </div>
    );
};

export default BlogPage;