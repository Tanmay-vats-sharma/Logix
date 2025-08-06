import React, { useRef } from 'react';
import { FaUserEdit, FaCalendarDay, FaMicrophone, FaHandHoldingUsd, FaTrophy } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

const EventDetailsPage = () => {
  const steps = [
    {
      icon: <FaUserEdit className="text-3xl text-purple-400" />,
      title: "Step 1: Registration",
      description: "Secure your spot in the competition by completing the registration form.",
      details: [
        "Fill out the participant information form",
        "Submit your project abstract (max 300 words)",
        "Upload your team photo (optional but recommended)",
        "Agree to the competition terms and conditions",
        "Receive confirmation email with your participant ID"
      ],
      color: "bg-purple-900/60"
    },
    {
      icon: <FaCalendarDay className="text-3xl text-blue-400" />,
      title: "Step 2: Event Day Preparation",
      description: "What to expect and how to prepare for the big day.",
      details: [
        "Arrive 30 minutes before your scheduled time",
        "Check-in at registration desk with your ID",
        "Technical setup: Test your presentation slides",
        "Dress code: Business casual recommended",
        "Prepare your 5-minute pitch (strict timing)"
      ],
      color: "bg-blue-900/60"
    },
    {
      icon: <FaMicrophone className="text-3xl text-green-400" />,
      title: "Step 3: Project Presentations",
      description: "The main event where you'll showcase your innovation.",
      details: [
        "Each team gets 5 minutes to present",
        "Followed by 2 minutes Q&A from judges",
        "Presentations occur in scheduled slots",
        "Live stream available for remote viewers",
        "Audience etiquette: No interruptions during pitches"
      ],
      color: "bg-green-900/60"
    },
    {
      icon: <FaHandHoldingUsd className="text-3xl text-yellow-400" />,
      title: "Step 4: Live Bidding Session",
      description: "The audience determines the winners through our unique bidding system.",
      details: [
        "Each attendee receives 100 virtual points",
        "Points can be distributed across multiple projects",
        "Bidding lasts exactly 1 minute per project",
        "Real-time leaderboard updates displayed",
        "No changes allowed after bidding closes"
      ],
      color: "bg-yellow-900/60"
    },
    {
      icon: <FaTrophy className="text-3xl text-red-400" />,
      title: "Step 5: Results & Awards",
      description: "The moment of truth - celebrating innovation and creativity.",
      details: [
        "Top 3 projects with highest bids announced",
        "Prizes: $1000, $500, and $250 respectively",
        "Special recognition for 'Audience Favorite'",
        "Networking session with judges and sponsors",
        "Photo session with all participants"
      ],
      color: "bg-red-900/60"
    }
  ];

  const refs = steps.map(() => useRef(null));
  
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            InnovateX Competition
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your complete guide to participating in our annual tech showcase event.
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
          <h2 className="text-2xl font-bold mb-4 text-white">Important Notes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Judging Criteria</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Innovation and creativity (30%)</li>
                <li>• Technical implementation (25%)</li>
                <li>• Potential impact (20%)</li>
                <li>• Presentation quality (15%)</li>
                <li>• Audience engagement (10%)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">FAQs</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <span className="font-medium">Team size:</span> 1-4 members</li>
                <li>• <span className="font-medium">Eligibility:</span> Current students only</li>
                <li>• <span className="font-medium">Deadline:</span> November 30th</li>
                <li>• <span className="font-medium">Location:</span> College Auditorium</li>
                <li>• <span className="font-medium">Contact:</span> innovatex@college.edu</li>
              </ul>
            </div>
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
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Showcase Your Innovation?</h2>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Register Your Team Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetailsPage;