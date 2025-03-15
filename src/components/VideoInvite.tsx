
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, X } from "lucide-react";

const VideoInvite: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLIFrameElement | null>(null);

  // Show bubble when user reaches bottom of page
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 500);
          
          // Disconnect after showing once
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      { threshold: 0.8 }
    );

    // Target element is the last section of the page (footer)
    const footerElement = document.querySelector("footer");
    if (footerElement && observerRef.current) {
      observerRef.current.observe(footerElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const openVideo = () => {
    setIsVideoOpen(true);
    setHasWatched(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    
    // Stop video when closing
    if (videoRef.current && videoRef.current.src) {
      // Add a parameter to stop the video
      const currentSrc = videoRef.current.src;
      videoRef.current.src = currentSrc;
    }
  };

  return (
    <>
      {/* Floating video bubble */}
      <AnimatePresence>
        {(isVisible || hasWatched) && (
          <motion.div
            ref={targetRef}
            initial={isVisible ? { x: -100, opacity: 0 } : { x: 0, opacity: hasWatched ? 0.7 : 1 }}
            animate={hasWatched ? { x: 0, opacity: 0.7 } : { x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className={`fixed bottom-24 left-6 z-50 ${hasWatched ? "hover:opacity-100" : ""}`}
          >
            <button
              onClick={openVideo}
              className="glass-effect bg-gradient-to-r from-festival-purple to-festival-pink text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ripple-animation active:scale-95"
              aria-label="Watch invitation video"
            >
              <Video className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-video">
                <iframe
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Invitation Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 glass-effect p-2 rounded-full text-festival-red hover:bg-white/80 transition-all active:scale-95"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoInvite;
