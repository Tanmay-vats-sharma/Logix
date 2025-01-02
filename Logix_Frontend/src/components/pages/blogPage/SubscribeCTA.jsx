import React from 'react';
import LOGO from '../../../assets/logix.png';

const SubscribeCTA = () => {
    return (
        <div className="w-full h-svh flex items-center justify-center">
            <div className='bg-[#1b1c1d] w-11/12 h-3/5 rounded-xl relative overflow-hidden flex items-center justify-center'>
                {/* Left Circle */}
                <div className='absolute top-auto bottom-[-32%] left-[-15%] w-full z-0  '>
                    <img src="https://cdn.prod.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%2001.png" loading="lazy" sizes="(max-width: 479px) 180px, (max-width: 767px) 260px, 350px" srcset="https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%252001-p-500.png 500w, https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%252001-p-800.png 800w, https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%2001.png 900w" alt="" className='z-0' />
                </div>
                {/* Main Container */}
                <div className='flex flex-col items-center  h-full w-2/5 p-7 text-[#fff] gap-3 hebrew-text'>
                    {/* Logo */}
                    <img src={LOGO} alt="LOGO" className='h-20 w-36 object-contain  bg-Custom z-0 ' />

                    {/* For Background Effect */}
                    <div className='absolute top-1/2 bottom-auto h-1 w-1 shadow-customShadow z-0' />

                    {/* Text */}
                    <div className='z-0'>
                        <div className='font-extrabold text-xl'>
                            Subscribe to Get Latest Updates
                        </div>
                        <div className='text-[#7d7d7d] text-center text-wrap text-sm mt-1'>
                            Get the latest updates, tutorials, and insights directly in your inbox!
                        </div>
                    </div>

                    {/* Input */}
                    <div>
                        <input type="text" className='w-full h-10 bg-[#333] text-[#fff] rounded-lg px-3 z-10' placeholder='Enter your email address' />
                    </div>
                    

                </div>
                {/* Right Circle */}
                <div className='absolute top-[-18%] bottom-auto left-auto right-[-14%] w-full rotate-180 z-0'>
                    <img src="https://cdn.prod.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%2001.png" loading="lazy" sizes="(max-width: 479px) 180px, (max-width: 767px) 270px, 350px" srcset="https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%252001-p-500.png 500w, https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%252001-p-800.png 800w, https://assets-global.website-files.com/66315e3c995f7695cb44eaf9/66315e3c995f7695cb44eb85_Circle%2001.png 900w" alt="" className='z-0' />
                </div>
            </div>
        </div>
    );
};

export default SubscribeCTA;