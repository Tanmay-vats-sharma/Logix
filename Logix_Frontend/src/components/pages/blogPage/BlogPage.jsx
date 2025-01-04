import React from 'react';
import Intro from './Intro';
import SubscribeCTA from './SubscribeCTA';
import SearchPaginator from './SearchPaginator';
import BlogCardGrid from './BlogCardGrid';

const BlogPage = () => {
    return (
        <div className=' flex flex-col items-center mt-8 gap-12 '>
            <section id='intro'>

                <Intro selector={"#intro"} />
            </section>
            <section id='searchPaginator'>
                <SearchPaginator selector={"#searchPaginator"} /> 
            </section>
            {/* <BlogCardGrid /> */}
            {/* FeaturedBlogs (Optional) */}
            {/* PopularBlogs (Optional) */}
            <section id='subscribeCTA' className='min-h-[80vh] min-w-[99vw]'>

                <SubscribeCTA selector={"#subscribeCTA"} />
            </section>
        </div>
    );
};

export default BlogPage;