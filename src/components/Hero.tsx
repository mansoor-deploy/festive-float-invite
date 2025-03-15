
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  name: string;
  age: number;
  date: string;
}

const Hero: React.FC<HeroProps> = ({ name, age, date }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      {/* Main content */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Tag line */}
        <motion.div
          className="inline-block mb-4 py-1 px-4 rounded-full glass-effect text-sm font-medium"
          variants={itemVariants}
        >
          You're Invited to
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 text-gradient-primary"
          variants={itemVariants}
        >
          {name}'s {age}
          <sup className="text-3xl md:text-4xl">th</sup>
        </motion.h1>

        {/* Birthday text with decorative elements */}
        <motion.div
          className="relative inline-block"
          variants={itemVariants}
        >
          <span className="text-4xl md:text-6xl font-display font-bold text-gradient-secondary mb-10 inline-block">
            Birthday Celebration
          </span>
          
          {/* Decorative stars */}
          <span className="absolute -top-6 -left-8 text-festival-yellow text-xl md:text-2xl rotate-12">✦</span>
          <span className="absolute -bottom-4 -right-8 text-festival-pink text-xl md:text-2xl -rotate-12">✦</span>
        </motion.div>

        {/* Date display */}
        <motion.p
          className="mt-8 mb-10 text-xl md:text-2xl text-gray-700 font-medium"
          variants={itemVariants}
        >
          <span className="glass-effect px-6 py-2 rounded-full inline-block">
            {date}
          </span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          variants={itemVariants}
        >
          <a
            href="#rsvp"
            className="glass-button button-gradient text-white font-medium text-lg px-10 py-4 rounded-full hover:shadow-lg hover:shadow-festival-purple/20 transition-all duration-300 active:scale-95"
          >
            RSVP Now
          </a>
          <a
            href="#details"
            className="glass-button font-medium text-lg hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            View Details
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <a href="#details" className="flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-2">Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;
