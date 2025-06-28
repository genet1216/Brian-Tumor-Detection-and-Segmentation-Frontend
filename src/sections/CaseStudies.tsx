import React from 'react';
import { motion } from 'framer-motion';

const CaseStudies = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Shadow gradient similar to Technology section */}
      <div className="absolute bottom-0 left-0 w-full h-24 "></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl mb-16 "
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          AI-Based Brain Tumor Detection <br />The Key to the Future for Medical Diagnostics
        </motion.h2>
        
        <div className="space-y-24">
          {/* First case study - Text left, image right */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-1/2 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">Advanced MRI Analysis</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Our AI system can detect and classify tumors from MRI scans with over 95% accuracy, 
                  helping radiologists make faster and more accurate diagnoses.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                    <span className="text-gray-700">Reduces diagnostic time by up to 60%</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                    <span className="text-gray-700">Identifies subtle patterns human eyes might miss</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                    <span className="text-gray-700">Continuously improves with new data</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur-lg opacity-70"></div>
                <div className="relative bg-white p-3 rounded-xl shadow-lg">
                  <img 
                    src="/images/case-study-1.jpg" 
                    alt="MRI scan analysis with AI" 
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    95% Accuracy
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-blue-200 rounded-lg rotate-12 opacity-70"></div>
                <div className="absolute -bottom-8 right-12 w-16 h-16 border-2 border-purple-200 rounded-full opacity-70"></div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Second case study - Text right, image left */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-1/2 order-2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">Tumor Segmentation</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Beyond detection, our system provides precise tumor segmentation, 
                  helping medical professionals understand tumor size, shape, and location.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span className="text-gray-700">3D visualization of tumor boundaries</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span className="text-gray-700">Precise volume and dimension measurements</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span className="text-gray-700">Assists in surgical planning and treatment</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 order-1">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl blur-lg opacity-70"></div>
                <div className="relative bg-white p-3 rounded-xl shadow-lg">
                  <img 
                    src="/images/case-study-2.jpg" 
                    alt="Brain scan visualization" 
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="absolute -bottom-3 -left-3 bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                    High Precision
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-8 right-12 w-14 h-14 border-2 border-purple-200 rounded-lg -rotate-12 opacity-70"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-blue-200 rounded-full opacity-70"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;