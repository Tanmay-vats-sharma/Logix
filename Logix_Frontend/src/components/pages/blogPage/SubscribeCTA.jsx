import React from 'react';
import { useState, useEffect } from 'react';
import LOGO from '../../../assets/logix.png';
import Button from '../../common/button';
import useIntersectionObserver from "../../Layout/useIntersectionObserver"

const SubscribeCTA = ({ selector }) => {
    const isIntersecting = useIntersectionObserver({ selector });
    const [submit, setSubmit] = useState(false);

    const handleSubmit = () => {
        setSubmit(!submit);
    };

    useEffect(() => {
        console.log(submit);
    }, [submit]);

    return (
            <div>
            {isIntersecting && (
                <div className='flex items-center justify-center'>
                    <div className='bg-[#1b1c1d] w-9/12 h-4/5 rounded-xl relative overflow-hidden flex items-center justify-center'>
                        {/* Left Circle */}
                        <div className='absolute top-auto bottom-[-32%] left-[-15%] w-full z-0 motion-translate-x-in-[-89%] motion-translate-y-in-[61%] motion-ease-spring-smooth motion-duration-[900ms] '>
                            <img src="https://cdn.prod.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%2001.png" loading="lazy" sizes="(max-width: 479px) 180px, (max-width: 767px) 260px, 350px" srcset="https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%252001-p-500.png 500w, https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%252001-p-800.png 800w, https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%2001.png 900w" alt="" className='z-0' />
                        </div>
                        {/* Main Container */}
                        <div className='flex flex-col items-center justify-center  h-full w-3/5 p-7 text-[#fff] gap-4 hebrew-text relative'>
                            {/* Logo */}
                            <img
                                src={LOGO}
                                alt="LOGO"
                                className='h-20 w-36 object-contain z-0 motion-translate-x-in-[1%] motion-translate-y-in-[-144%] motion-duration-[900ms] motion-ease-spring-smooth motion-delay-[300ms] '
                            />

                            {/* For Background Effect */}
                            <div className='absolute top-1/2 bottom-auto h-1 w-1 shadow-customShadow z-0 motion-scale-in-[0] motion-ease-in-out motion-delay-[300ms]' />

                            {/* Text */}
                            <div className='w-[75%] motion-scale-in-[0] motion-translate-x-in-[0%] motion-translate-y-in-[-104%] motion-ease-spring-smooth motion-duration-[900ms] motion-delay-[300ms]'>
                                <div className='flex justify-center font-extrabold text-xl text-centre text-wrap'>
                                    Subscribe to Get Latest Updates
                                </div>
                                <div className='flex justify-center text-[#7d7d7d] text-center text-wrap text-sm mt-1'>
                                    Get the latest updates, tutorials, and insights directly in your inbox!
                                </div>
                            </div>

                            {/* Input */}
                            {submit ? (
                                <div tabIndex={-1} role="region" aria-label="Early Access Emails success" className="box-border bg-[rgb(51,51,51)] text-center shadow-[rgba(0,0,0,0.24)_0px_4px_4px_0px,rgba(0,0,0,0.24)_0px_0px_14px_0px,rgba(99,91,255,0.12)_0px_21px_36px_0px] text-[rgb(125,125,125)] text-[16px] w-[370px] leading-[19.2px] border p-[20px] rounded-[8px] border-solid border-[rgb(81,81,81)] motion-scale-in-[0] motion-duration-[1100ms] motion-delay-[300ms]">
                                    <div className='flex flex-col justify-center '>
                                        <p className='text-white font-bold'>Thank You!</p>
                                        <p className=' text-[#7d7d7d]'>Your Submission has been received!</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center justify-center gap-4'>
                                    <input type="text" className='outline-none z-10 mt-5 text-centre placeholder:text-center text-lg box-border bg-[rgb(51,51,51)] h-12 align-middle w-96 shadow-[rgba(0,0,0,0.24)_0px_4px_12.7447px_0px,rgba(0,0,0,0.24)_0px_0px_14px_0px,rgba(99,91,255,0.07)_0px_21px_69.7294px_0px] transition-[border-color] duration-[0.45s,box-shadow] delay-[0.425s] border px-[12px] py-[8px] rounded-[8px] border-solid border-[#333] motion-scale-in-[0] motion-translate-x-in-[0%] motion-translate-y-in-[99%] motion-duration-[900ms] motion-delay-[300ms]' placeholder='Enter your email address' />

                                    <Button height="35px" width="100px" value="Submit" className="text-xl motion-scale-in-[0] motion-translate-x-in-[5%] motion-translate-y-in-[157%] motion-delay-[300ms]" onClick={handleSubmit} />

                                </div>
                            )}

                        </div>
                        {/* Right Circle */}
                        <div className='absolute top-[-18%] bottom-auto left-auto right-[-14%] w-full rotate-180 z-0 motion-translate-x-in-[51%] motion-translate-y-in-[-47%] motion-ease-spring-smooth motion-duration-[900ms] '>
                            <img src="https://cdn.prod.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%2001.png" loading="lazy" sizes="(max-width: 479px) 180px, (max-width: 767px) 270px, 350px" srcset="https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%252001-p-500.png 500w, https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%252001-p-800.png 800w, https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%2001.png 900w" alt="" className='z-0' />

                        </div>
                    </div>
                </div>
            )}
            </div>
    );
};

export default SubscribeCTA;