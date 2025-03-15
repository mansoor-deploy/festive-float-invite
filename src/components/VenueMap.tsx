
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

interface VenueMapProps {
  address: string;
  mapUrl: string;
}

const VenueMap: React.FC<VenueMapProps> = ({ address, mapUrl }) => {
  return (
    <div id="venue" className="py-20 px-6 scroll-section">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-4 rounded-full glass-effect text-sm font-medium mb-4">
            Location
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Venue Details</h2>
          <p className="text-gray-600 max-w-lg mx-auto flex items-center justify-center gap-1">
            <MapPin className="h-4 w-4" />
            {address}
          </p>
        </motion.div>

        <motion.div
          className="rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="aspect-video w-full relative">
            {/* For a static demo, we'll use a placeholder image. In a real app, you'd include Google Maps iframe */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <img 
                src="https://maps.googleapis.com/maps/api/staticmap?center=Central+Park,New+York,NY&zoom=14&size=800x400&markers=color:red%7CNew+York,NY&key=YOUR_API_KEY_HERE" 
                alt="Map location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 glass-effect rounded-3xl max-w-md">
                  <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                  <p className="text-gray-700 mb-4">For an interactive map and directions, click below.</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-full font-medium glass-button button-gradient text-white hover:shadow-lg transition-all active:scale-95"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600">
            Parking is available on-site. Feel free to arrange carpooling with other guests.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VenueMap;
