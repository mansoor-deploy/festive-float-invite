
import React from "react";
import { motion } from "framer-motion";

const Gallery: React.FC = () => {
  // Sample gallery images
  const galleryImages = [
    // These are placeholder URLs
    "https://images.unsplash.com/photo-1532117182044-9085b90689f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    <div className="py-8 sm:py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-4 rounded-full glass-effect text-sm font-medium mb-3">
            Memories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Photo Gallery</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            A glimpse of the moments we've shared. More memories coming soon!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl aspect-square group"
              variants={itemVariants}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <span className="text-white text-sm font-medium">
                  Happy Moments {index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600">
            More photos will be added after the celebration.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
