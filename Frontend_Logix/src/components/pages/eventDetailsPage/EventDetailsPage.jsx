import React, { useRef } from 'react';
import { FaUserEdit, FaCalendarDay, FaMicrophone, FaHandHoldingUsd, FaTrophy } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import steps from '../../../constants/EventDetails';
const EventDetailsPage = () => {
  const navigate = useNavigate();

  const refs = steps.map(() => useRef(null));

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen w-[99svw] sm:w-auto py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Style Sprint
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Race against time in Logix’s front-end showdown! Fix HTML & CSS fast and style your way to victory.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-16">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const ref = refs[index];
            const isInView = useInView(ref, { once: false, margin: "-100px" });

            return (
              <div
                key={index}
                ref={ref}
                className={`relative ${isEven ? 'pr-0 md:pr-16' : 'pl-0 md:pl-16'}`}
              >
                {/* Step indicator */}
                <div className="flex absolute top-0 h-full w-16 items-center justify-center">
                  <div className="h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  <div className="absolute w-8 h-8 rounded-full bg-gray-800 border-2 border-purple-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{index + 1}</span>
                  </div>
                </div>

                <motion.div
                  initial={{
                    x: isEven ? -100 : 100,
                    opacity: 0
                  }}
                  animate={isInView ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: index * 0.25
                    }
                  } : {}}
                  className={`relative ${step.color} backdrop-blur-sm border border-gray-800 shadow-lg rounded-xl p-8`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 flex items-start">
                      {step.icon}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold mb-3 text-white">{step.title}</h2>
                      <p className="text-lg text-gray-300 mb-4">{step.description}</p>

                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5">
                              <svg className="h-3 w-3 text-purple-400" fill="currentColor" viewBox="0 0 12 12">
                                <path d="M11.707 2.293a1 1 0 00-1.414 0L4.586 8 1.707 5.121a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
                              </svg>
                            </span>
                            <span className="text-gray-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gray-800/50 p-8 rounded-xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4 text-violet-500">Important Notes</h2>
          <ul className="space-y-4 text-gray-300">
            <li>
              • <span className="font-medium">Who can participate?</span>
              Open to all students passionate about front-end.
            </li>
            <li>
              • <span className="font-medium">How does the timer work?</span>
              Each round has a fixed countdown. Submit before time runs out!
            </li>
            <li>
              • <span className="font-medium">Do I need prior experience?</span>
              Basic HTML & CSS knowledge is enough.
            </li>
            <li>
              • <span className="font-medium">Is it a team or solo event?</span>
              Solo participation only.
            </li>
          </ul>

          {/* Contact Details */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-violet-500">Contact Details</h2>
            <ul className="space-y-3 text-gray-300">
              <li>
                • <span className="font-medium">Contact Email:</span> logix@rkgit.edu.in
              </li>
              <li>
                • <span className="font-medium">Technical Head:</span> Naman Malik — 9818084320
              </li>
              <li>
                • <span className="font-medium">Technical Head:</span> Tanmay Sharma — 8076917248
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Not Registered yet?</h2>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => { navigate("/register") }}>
            Register Your Team Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetailsPage;