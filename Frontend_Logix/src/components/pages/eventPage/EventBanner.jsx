import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight,Calendar } from 'lucide-react';

const EventBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your event date here (YYYY, MM-1, DD)
  const eventDate = new Date(2025, 11, 15); // December 15, 2023

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 md:h-[92svh] w-full overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80')"
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* Event Tag */}
          <div className="inline-flex items-center px-4 py-2 bg-purple-600/80 rounded-full mb-6">
            <Calendar className="mr-2" />
            <span className="text-sm font-medium">Logix Event</span>
          </div>
          
          {/* Event Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            InnovateX <span className="text-purple-400">2025</span>
          </h1>
          
          {/* Event Description */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us for the biggest tech showcase of the year. Witness groundbreaking projects from our brightest minds.
          </p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">{timeLeft.days}</div>
              <div className="text-xs uppercase text-gray-400">Days</div>
            </div>
            <div className="text-2xl text-gray-400 pt-2">:</div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">{timeLeft.hours}</div>
              <div className="text-xs uppercase text-gray-400">Hours</div>
            </div>
            <div className="text-2xl text-gray-400 pt-2">:</div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">{timeLeft.minutes}</div>
              <div className="text-xs uppercase text-gray-400">Minutes</div>
            </div>
            <div className="text-2xl text-gray-400 pt-2">:</div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">{timeLeft.seconds}</div>
              <div className="text-xs uppercase text-gray-400">Seconds</div>
            </div>
          </div>
          
          {/* Register Button */}
          <button className="inline-flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 group">
            Register Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;