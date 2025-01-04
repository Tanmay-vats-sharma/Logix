import React from 'react';
import { TextEffect } from '../../motion-ui/TextEffect';
import useIntersectionObserver from "../../Layout/useIntersectionObserver"
const Intro = ({ selector }) => {
    const isIntersecting = useIntersectionObserver({ selector });
    return (
        <div>
            {isIntersecting && (
                <div className='w-full h-2/5 p-4 mt-12'>
                    <div className=' flex  flex-col  justify-center text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl tracking-tighter '>
                        <TextEffect
                            per='char'
                            delay={0.5}
                            variants={{
                                container: {
                                    hidden: {
                                        opacity: 0,
                                    },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.05,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        rotateX: 90,
                                        y: 10,
                                    },
                                    visible: {
                                        opacity: 1,
                                        rotateX: 0,
                                        y: 0,
                                        transition: {
                                            duration: 0.2,
                                        },
                                    },
                                },
                            }}
                        >
                            Recent Blogs Posted
                        </TextEffect>
                        <TextEffect
                            className={'sm:mt-4'}
                            per='char'
                            delay={1}
                            variants={{
                                container: {
                                    hidden: {
                                        opacity: 0,
                                    },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.05,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        rotateX: 90,
                                        y: 10,
                                    },
                                    visible: {
                                        opacity: 1,
                                        rotateX: 0,
                                        y: 0,
                                        transition: {
                                            duration: 0.2,
                                        },
                                    },
                                },
                            }}
                        >
                            from us
                        </TextEffect>
                    </div>
                    <div className='hidden w-2/3 mx-auto sm:flex justify-center text-center text-[#7d7d7d] mt-3'>
                        <TextEffect
                            className='text-sm hebrew-text text-wrap p-2'
                            preset='fade-in-blur'
                            delay={1.4}
                            speedReveal={2}
                            speedSegment={0.8}>
                            Stay updated with the most recent blogs and articles from the Logix Society.
                            <br />
                            Expand your coding knowledge with insights and tutorials crafted just for you!
                        </TextEffect>

                    </div>

                </div>
            )}
        </div>

    );
};

export default Intro;