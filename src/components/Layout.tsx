
import React, { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import VideoInvite from "./VideoInvite";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen background-gradient confetti-bg overflow-hidden">
      {/* Floating balloon decorations */}
      <div className="fixed -left-10 top-1/4 w-16 h-24 balloon balloon-red rounded-full animate-float opacity-80"></div>
      <div className="fixed left-1/4 -top-10 w-12 h-20 balloon balloon-yellow rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }}></div>
      <div className="fixed right-1/4 top-1/3 w-14 h-22 balloon balloon-blue rounded-full animate-float opacity-80" style={{ animationDelay: '2.5s' }}></div>
      <div className="fixed -right-5 top-1/2 w-16 h-24 balloon balloon-purple rounded-full animate-float opacity-70" style={{ animationDelay: '1.5s' }}></div>
      <div className="fixed left-1/3 bottom-1/4 w-10 h-16 balloon balloon-green rounded-full animate-float opacity-70" style={{ animationDelay: '3s' }}></div>
      <div className="fixed right-1/3 -bottom-10 w-12 h-20 balloon balloon-orange rounded-full animate-float opacity-80" style={{ animationDelay: '2s' }}></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/30 pointer-events-none"></div>

      {/* Main content container with fade-in animation */}
      <div className={`relative z-10 transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>

      {/* Fixed music player */}
      <MusicPlayer />
      
      {/* Video invitation bubble */}
      <VideoInvite />

      {/* Footer with credits */}
      <footer className="w-full text-center py-4 text-xs text-gray-500 mt-20">
        <p>Made with ♥ for a special day</p>
      </footer>
    </div>
  );
};

export default Layout;
