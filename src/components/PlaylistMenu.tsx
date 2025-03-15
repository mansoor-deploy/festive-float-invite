
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ListMusic, Check, Plus, X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface Song {
  id: number;
  title: string;
  artist: string;
}

const PlaylistMenu: React.FC = () => {
  const [playlist, setPlaylist] = useState<Song[]>([
    { id: 1, title: "Happy Birthday", artist: "Various Artists" },
    { id: 2, title: "Celebration", artist: "Kool & The Gang" },
    { id: 3, title: "I Gotta Feeling", artist: "Black Eyed Peas" },
    { id: 4, title: "Can't Stop the Feeling", artist: "Justin Timberlake" },
    { id: 5, title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
  ]);
  
  const [songSuggestion, setSongSuggestion] = useState("");
  const [artistSuggestion, setArtistSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitSuggestion = () => {
    if (!songSuggestion.trim() || !artistSuggestion.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setPlaylist([
        ...playlist,
        { 
          id: playlist.length + 1, 
          title: songSuggestion.trim(), 
          artist: artistSuggestion.trim() 
        }
      ]);
      
      setSongSuggestion("");
      setArtistSuggestion("");
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 800);
  };

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
      className="py-24 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      id="playlist"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-4 rounded-full glass-effect text-sm font-medium mb-4">
            Music Makes The Party
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Party Playlist</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Check out our curated playlist and suggest your favorite songs to make this celebration unforgettable!
          </p>
        </div>

        <div className="glass-effect rounded-3xl p-8 md:p-10">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playlist.map((song) => (
                <div key={song.id} className="glass-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center flex-shrink-0">
                    <ListMusic className="w-5 h-5 text-festival-purple" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{song.title}</h3>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-center">Suggest a Song</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-4">
                  <label className="block text-sm font-medium mb-2">Song Title</label>
                  <input
                    type="text"
                    value={songSuggestion}
                    onChange={(e) => setSongSuggestion(e.target.value)}
                    placeholder="Enter song title"
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-festival-purple/50"
                  />
                </div>
                
                <div className="glass-card p-4">
                  <label className="block text-sm font-medium mb-2">Artist</label>
                  <input
                    type="text"
                    value={artistSuggestion}
                    onChange={(e) => setArtistSuggestion(e.target.value)}
                    placeholder="Enter artist name"
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-festival-purple/50"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSubmitSuggestion}
                  disabled={isSubmitting || !songSuggestion.trim() || !artistSuggestion.trim()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all active:scale-95 text-sm md:text-base ${
                    isSubmitting || !songSuggestion.trim() || !artistSuggestion.trim()
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "glass-effect hover:bg-white/50"
                  }`}
                >
                  {isSubmitting ? (
                    <span>Adding...</span>
                  ) : isSuccess ? (
                    <>
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Added to playlist!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add to playlist</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Sheet>
            <SheetTrigger asChild>
              <button className="px-6 py-2 rounded-full glass-effect hover:bg-white/50 transition-all active:scale-95 text-sm md:text-base">
                <ListMusic className="w-4 h-4 inline-block mr-2" />
                View Full Playlist
              </button>
            </SheetTrigger>
            <SheetContent className="glass-effect overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-gradient-primary">Complete Playlist</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-3">
                {playlist.map((song) => (
                  <div key={song.id} className="p-3 glass-card rounded-lg">
                    <h4 className="font-semibold">{song.title}</h4>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 glass-card">
                <h3 className="font-medium mb-2">Special Requests?</h3>
                <Textarea 
                  placeholder="Let us know if you have any special song requests or dedications..." 
                  className="bg-white/50"
                />
                <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full glass-effect hover:bg-white/50 transition-all active:scale-95 text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Submit Request</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistMenu;
