
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen background-gradient confetti-bg flex items-center justify-center px-6 py-20">
      <motion.div 
        className="glass-effect rounded-3xl p-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-20 rounded-full glass-effect flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">404</span>
        </div>
        <h1 className="text-4xl font-bold text-gradient-primary mb-4">Oops!</h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for can't be found
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="glass-button button-gradient text-white font-medium flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="glass-button font-medium flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
