
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RSVP: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "maybe" | null>(null);
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "RSVP Submitted",
        description: "Thanks for your response! We've received your RSVP.",
      });

      // Reset form
      setTimeout(() => {
        setName("");
        setEmail("");
        setAttending(null);
        setGuests(0);
        setMessage("");
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const attendanceOptions = [
    { value: "yes", label: "Absolutely!" },
    { value: "no", label: "Unfortunately, No" },
    { value: "maybe", label: "Maybe" },
  ] as const;

  return (
    <div id="rsvp" className="py-20 px-6 scroll-section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-4 rounded-full glass-effect text-sm font-medium mb-4">
            Let Us Know
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Will You Be There?</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Please RSVP by filling out the form below. We can't wait to celebrate with you!
          </p>
        </motion.div>

        <motion.div
          className="glass-effect rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-festival-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-festival-green" />
              </div>
              <h3 className="text-xl font-semibold text-gradient-primary mb-2">
                Thank You!
              </h3>
              <p className="text-gray-700">
                Your RSVP has been submitted successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-effect bg-white/30 focus:outline-none focus:ring-2 focus:ring-festival-purple/30 transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-effect bg-white/30 focus:outline-none focus:ring-2 focus:ring-festival-purple/30 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Will you attend?
                </label>
                <div className="flex flex-wrap gap-4">
                  {attendanceOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAttending(option.value)}
                      className={`px-6 py-3 rounded-xl glass-effect transition-all ${
                        attending === option.value
                          ? "bg-festival-purple text-white"
                          : "hover:bg-white/50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {attending === "yes" && (
                <div>
                  <label 
                    htmlFor="guests" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Guests (including yourself)
                  </label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl glass-effect bg-white/30 focus:outline-none focus:ring-2 focus:ring-festival-purple/30 transition-all"
                    required
                  >
                    <option value={0}>Select number of guests</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-effect bg-white/30 focus:outline-none focus:ring-2 focus:ring-festival-purple/30 transition-all"
                  placeholder="Any dietary restrictions or special requests?"
                  rows={4}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 rounded-full button-gradient text-white font-medium flex items-center justify-center mx-auto transition-all ${
                    isSubmitting ? "opacity-70" : "hover:shadow-lg hover:shadow-festival-purple/20 active:scale-95"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RSVP;
