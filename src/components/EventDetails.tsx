
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Cake, Gift, Music } from "lucide-react";

interface EventDetailsProps {
  date: string;
  time: string;
  venue: string;
  dresscode: string;
  theme: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  date,
  time,
  venue,
  dresscode,
  theme,
}) => {
  const details = [
    {
      icon: <Calendar className="w-6 h-6 text-festival-purple" />,
      title: "Date",
      content: date,
    },
    {
      icon: <Clock className="w-6 h-6 text-festival-blue" />,
      title: "Time",
      content: time,
    },
    {
      icon: <Cake className="w-6 h-6 text-festival-pink" />,
      title: "Theme",
      content: theme,
    },
    {
      icon: <Gift className="w-6 h-6 text-festival-orange" />,
      title: "Dress Code",
      content: dresscode,
    },
    {
      icon: <Music className="w-6 h-6 text-festival-green" />,
      title: "Entertainment",
      content: "Live DJ & Games",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div id="details" className="py-10 sm:py-16 px-4 sm:px-6 scroll-section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-4 rounded-full glass-effect text-sm font-medium mb-3 sm:mb-4">
            Everything You Need To Know
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Event Details</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto">
            We've planned an amazing day to celebrate this special occasion. Here's what you need to know.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {details.map((detail, index) => (
            <motion.div
              key={index}
              className="glass-card flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center mb-4">
                {detail.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{detail.title}</h3>
              <p className="text-sm sm:text-base text-gray-700">{detail.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
