import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AICapabilities = () => {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Hero text section with large bold text */}
        <div> 
          <h3 className='text-blue-700 text-bold'>
            AI Capabilities
          </h3>
          <motion.p
            className="text-2xl md:text-4xl lg:text-6xl leading-relaxed font-light"
            initial={{ opacity: 0.3, fontWeight: 100, color: "#9CA3AF" }}
            whileInView={{ 
              opacity: 1, 
              fontWeight: 400,
              color: "#1F2937",
              transition: {
                opacity: { duration: 1.2 },
                fontWeight: { duration: 1.5 },
                color: { duration: 1.8 }
              }
            }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Our advanced neural network delivers unparalleled accuracy in detecting and classifying brain tumors, providing medical professionals with a powerful <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">diagnostic tool</span> that saves lives through early detection.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AICapabilities;