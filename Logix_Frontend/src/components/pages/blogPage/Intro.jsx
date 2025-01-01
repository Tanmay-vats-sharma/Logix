import React from 'react';
import { TextEffect } from '../../motion-ui/TextEffect';
const Intro = () => {
    return (
        <div className='w-svw h-2/5 p-4'>
            <div className='text-center  text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl  '>
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
            <div className='hidden w-2/6 mx-auto sm:flex justify-center mt-3'>
                <TextEffect 
                className='text-sm hebrew-text text-wrap p-2'
                preset='fade-in-blur'
                delay={1.4}
                speedReveal={2} 
                speedSegment={0.8}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id nunc odio. Aliquam et tellus urna. Phasellus eget
                </TextEffect>

            </div>
        </div>

    );
};

export default Intro;