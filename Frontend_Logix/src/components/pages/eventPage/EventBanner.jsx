import React, { useState, useEffect, useRef } from 'react';
import { FaClock, FaArrowRight, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EventBanner = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your event date here (YYYY, MM-1, DD)
  const eventDate = new Date(2025, 11, 15); // December 15, 2025

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const countdownVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative py-4 h-auto md:h-[500px] w-full overflow-hidden min-w-[98svw]"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80')"
        }}
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>
      
      {/* Content */}
      <motion.div 
        className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-4xl mx-auto">
          {/* Event Tag */}
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-purple-600/80 rounded-full mb-6"
            variants={itemVariants}
          >
            <FaCalendarAlt className="mr-2" />
            <span className="text-sm font-medium">Annual Event</span>
          </motion.div>
          
          {/* Event Title */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            InnovateX <span className="text-purple-400">2025</span>
          </motion.h1>
          
          {/* Event Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join us for the biggest tech showcase of the year. Witness groundbreaking projects from our brightest minds.
          </motion.p>
          
          {/* Countdown Timer */}
          <motion.div 
            className="flex justify-center gap-4 mb-8"
            variants={countdownVariants}
          >
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
          </motion.div>
          
          {/* Buttons Group */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <motion.button 
              className="inline-flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
            >
              Register Now
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              className="inline-flex items-center px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 group border border-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/event-details")}
            >
              Event Details
              <FaInfoCircle className="ml-2 group-hover:rotate-180 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventBanner;