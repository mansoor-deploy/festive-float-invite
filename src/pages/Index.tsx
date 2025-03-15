
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import VenueMap from "@/components/VenueMap";
import RSVP from "@/components/RSVP";
import Gallery from "@/components/Gallery";
import PlaylistMenu from "@/components/PlaylistMenu";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  // Sample birthday data - would come from API or props in a real app
  const birthdayData = {
    name: "Sarah",
    age: 30,
    date: "October 15, 2023",
    time: "7:00 PM - 11:00 PM",
    venue: "Crystal Garden, 123 Celebration Avenue, New York, NY",
    dresscode: "Cocktail Attire",
    theme: "Festive Carnival",
    mapUrl: "https://maps.google.com/?q=Central+Park,New+York,NY",
  };

  useEffect(() => {
    // Change page title
    document.title = `${birthdayData.name}'s ${birthdayData.age}th Birthday Celebration`;
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Layout>
          <Hero
            name={birthdayData.name}
            age={birthdayData.age}
            date={birthdayData.date}
          />
          
          <Countdown targetDate={birthdayData.date} />
          
          <EventDetails
            date={birthdayData.date}
            time={birthdayData.time}
            venue={birthdayData.venue}
            dresscode={birthdayData.dresscode}
            theme={birthdayData.theme}
          />
          
          <VenueMap
            address={birthdayData.venue}
            mapUrl={birthdayData.mapUrl}
          />
          
          <Gallery />
          
          <PlaylistMenu />
          
          <RSVP />
        </Layout>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
