import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTA = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Interactive background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white md:max-w-md">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Experience the future of medical diagnostics today
                </motion.h2>
                <motion.p 
                  className="text-white/80 text-lg mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Our AI-powered platform is revolutionizing how brain tumors are detected and classified, providing unprecedented accuracy and speed.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div 
                  className="relative"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-70 blur-md"
                    animate={{
                      scale: isHovering ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <Link 
                    to="/analysis" 
                    className="relative px-8 py-4 bg-white text-blue-900 font-medium rounded-full inline-flex items-center gap-2 hover:bg-blue-50 transition-colors z-10"
                  >
                    <span>Start Analysis</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-10 pt-8 border-t border-white/20 flex flex-wrap justify-between gap-4 text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold text-white">95%+</div>
                <div className="text-sm">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">30s</div>
                <div className="text-sm">Analysis Time</div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm">Availability</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;