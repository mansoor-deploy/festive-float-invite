
import React, { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

// Create a context for controlling audio globally
export const AudioPlayerContext = React.createContext<{
  pauseAudio: () => void;
  resumeAudio: () => void;
  isPlaying: boolean;
}>({
  pauseAudio: () => {},
  resumeAudio: () => {},
  isPlaying: false
});

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the audio element with SoundHelix music
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }

    setIsPlaying(!isPlaying);
  };

  const pauseAudio = () => {
    if (!audioRef.current || !isPlaying) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeAudio = () => {
    if (!audioRef.current || isPlaying) return;
    audioRef.current.play().catch(error => {
      console.error("Audio playback failed:", error);
    });
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <AudioPlayerContext.Provider value={{ pauseAudio, resumeAudio, isPlaying }}>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="glass-effect rounded-full p-4 flex items-center gap-2 shadow-lg">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-festival-purple hover:bg-white/50 transition-all active:scale-95"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            <Music className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-festival-purple hover:bg-white/50 transition-all active:scale-95"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          
          <div className="text-xs font-medium ml-1">
            {isPlaying ? (isMuted ? "Muted" : "Playing") : "Music"}
          </div>
        </div>
      </div>
    </AudioPlayerContext.Provider>
  );
};

export default MusicPlayer;
