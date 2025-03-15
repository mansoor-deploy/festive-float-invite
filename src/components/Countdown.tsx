
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus } from "lucide-react";

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addToGoogleCalendar = () => {
    // Format date for Google Calendar URL
    const eventDate = new Date(targetDate);
    const startDate = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
    
    // End date (4 hours after start)
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000)
      .toISOString().replace(/-|:|\.\d+/g, '');
    
    // Create Google Calendar URL with event details
    const eventTitle = "Birthday Celebration";
    const eventLocation = "Crystal Garden, 123 Celebration Avenue, New York, NY";
    const eventDescription = "Join us for an unforgettable birthday celebration!";
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(eventDescription)}`;
    
    // Open in a new tab
    window.open(googleCalendarUrl, '_blank');
  };

  const timerComponents = [];

  interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }

  Object.keys(timeLeft).forEach((interval) => {
    if (!(timeLeft as TimeLeft)[interval as keyof TimeLeft]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-24 md:h-24 glass-effect rounded-2xl flex items-center justify-center mb-2 text-3xl md:text-4xl font-bold text-gradient-primary">
          {(timeLeft as TimeLeft)[interval as keyof TimeLeft]}
        </div>
        <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">
          {interval}
        </span>
      </div>
    );
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="py-16 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      id="countdown"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block py-1 px-4 rounded-full glass-effect text-sm font-medium mb-4">
            Mark Your Calendar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Countdown Is On</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Join us for an unforgettable celebration. Time is ticking, we can't wait to see you!
          </p>
        </div>

        <div className="glass-effect rounded-3xl p-8 md:p-10">
          {timerComponents.length ? (
            <div className="flex flex-col gap-8">
              <div className="flex justify-center gap-4 md:gap-10">
                {timerComponents}
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={addToGoogleCalendar}
                  className="flex items-center gap-2 px-6 py-3 rounded-full glass-effect hover:bg-white/50 transition-all active:scale-95 text-sm md:text-base"
                >
                  <Calendar className="w-5 h-5 text-festival-green" />
                  <span>Add to Google Calendar</span>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-3xl text-center font-bold text-gradient-primary py-6">
              The celebration has begun!
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Countdown;
