import React from 'react';
import { motion } from 'framer-motion';

const Technology = () => {
  const techStack1 = [
    { 
      name: "TensorFlow", 
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path fill="#FF6F00" d="M16,0c-0.001,0-0.001,0-0.002,0C7.164,0.001,0.001,7.164,0,16.002C0,24.839,7.163,32,16,32 s16-7.161,16-16C32,7.163,24.837,0,16,0z M16,2c7.732,0,14,6.268,14,14s-6.268,14-14,14S2,23.732,2,16S8.268,2,16,2z"/>
          <path fill="#FF6F00" d="M16,21.5l-5-3v-6l5,3V21.5z M16,21.5l5-3v-6l-5,3V21.5z M11,11.5l5-3l5,3l-5,3L11,11.5z"/>
        </svg>
      )
    },
    { 
      name: "PyTorch", 
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path fill="#EE4C2C" d="M16.715,9.346c0,0.904-0.733,1.637-1.637,1.637s-1.637-0.733-1.637-1.637 s0.733-1.637,1.637-1.637S16.715,8.442,16.715,9.346z"/>
          <path fill="#EE4C2C" d="M12.647,15.618c0,0.727-0.589,1.316-1.316,1.316s-1.316-0.589-1.316-1.316 s0.589-1.316,1.316-1.316S12.647,14.891,12.647,15.618z"/>
          <path fill="#EE4C2C" d="M17.943,15.618c0,0.727-0.589,1.316-1.316,1.316s-1.316-0.589-1.316-1.316 s0.589-1.316,1.316-1.316S17.943,14.891,17.943,15.618z"/>
          <path fill="#EE4C2C" d="M14.295,20.079c0,0.727-0.589,1.316-1.316,1.316s-1.316-0.589-1.316-1.316 s0.589-1.316,1.316-1.316S14.295,19.352,14.295,20.079z"/>
          <path fill="#EE4C2C" d="M19.591,20.079c0,0.727-0.589,1.316-1.316,1.316s-1.316-0.589-1.316-1.316 s0.589-1.316,1.316-1.316S19.591,19.352,19.591,20.079z"/>
          <path fill="#EE4C2C" d="M21.239,15.618c0,0.727-0.589,1.316-1.316,1.316s-1.316-0.589-1.316-1.316 s0.589-1.316,1.316-1.316S21.239,14.891,21.239,15.618z"/>
        </svg>
      )
    },
    { 
      name: "Scikit-learn", 
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path fill="#F89939" d="M16.634,15.596c0.304-0.347,0.817-0.59,1.537-0.728c0.72-0.138,1.466-0.207,2.24-0.207 c0.604,0,1.235,0.058,1.893,0.173c0.658,0.115,1.247,0.323,1.77,0.624c0.522,0.3,0.953,0.693,1.292,1.178 c0.339,0.485,0.509,1.094,0.509,1.826c0,0.693-0.173,1.304-0.519,1.835c-0.346,0.531-0.796,0.981-1.35,1.35 c-0.554,0.369-1.189,0.647-1.904,0.832c-0.716,0.185-1.435,0.277-2.159,0.277c-0.693,0-1.373-0.073-2.043-0.219 c-0.67-0.146-1.262-0.381-1.777-0.705c-0.516-0.323-0.932-0.747-1.248-1.271c-0.316-0.523-0.474-1.158-0.474-1.904 c0-0.577,0.112-1.082,0.335-1.514C15.751,16.311,16.099,15.943,16.634,15.596z"/>
          <path fill="#3499CD" d="M24.245,11.956c-0.301-0.346-0.809-0.589-1.526-0.728c-0.716-0.139-1.459-0.208-2.228-0.208 c-0.6,0-1.227,0.058-1.881,0.173c-0.654,0.116-1.239,0.324-1.758,0.624c-0.52,0.301-0.947,0.693-1.283,1.178 c-0.337,0.485-0.505,1.093-0.505,1.826c0,0.693,0.172,1.304,0.516,1.835c0.343,0.531,0.789,0.981,1.34,1.35 c0.551,0.37,1.182,0.647,1.893,0.832c0.712,0.185,1.427,0.277,2.147,0.277c0.689,0,1.366-0.073,2.032-0.219 c0.666-0.146,1.255-0.381,1.766-0.705c0.512-0.323,0.927-0.747,1.24-1.271c0.313-0.523,0.47-1.158,0.47-1.904 c0-0.577-0.111-1.082-0.332-1.514C25.123,12.671,24.777,12.303,24.245,11.956z"/>
        </svg>
      )
    },
    { 
      name: "Keras", 
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path fill="#D00000" d="M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,2 c7.732,0,14,6.268,14,14s-6.268,14-14,14S2,23.732,2,16S8.268,2,16,2z"/>
          <path fill="#D00000" d="M9,8v16h2V8H9z M15,8v6h-3v2h3v8h2v-8h3v-2h-3V8H15z M21,8v16h2V8H21z"/>
        </svg>
      )
    }
  ];

  const techStack2 = [
    { 
      name: "OpenCV", 
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path fill="#5C3EE8" d="M16,2C8.268,2,2,8.268,2,16s6.268,14,14,14s14-6.268,14-14S23.732,2,16,2z M16,28 C9.383,28,4,22.617,4,16S9.383,4,16,4s12,5.383,12,12S22.617,28,16,28z"/>
          <path fill="#5C3EE8" d="M16,8c-4.418,0-8,3.582-8,8s3.582,8,8,8s8-3.582,8-8S20.418,8,16,8z M16,22 c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S19.309,22,16,22z"/>
          <circle fill="#5C3EE8" cx="16" cy="16" r="2"/>
        </svg>
      )
    },
    { 
      name: "NumPy", 
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path fill="#4DABCF" d="M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,2 c7.732,0,14,6.268,14,14s-6.268,14-14,14S2,23.732,2,16S8.268,2,16,2z"/>
          <path fill="#4DABCF" d="M14.314,8.427l-5.887,5.887c-0.781,0.781-0.781,2.047,0,2.828l5.887,5.887 c0.781,0.781,2.047,0.781,2.828,0l5.887-5.887c0.781-0.781,0.781-2.047,0-2.828l-5.887-5.887 C16.361,7.646,15.095,7.646,14.314,8.427z M16.728,10.841l4.887,4.887l-4.887,4.887l-4.887-4.887L16.728,10.841z"/>
        </svg>
      )
    },
    { 
      name: "Pandas", 
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path fill="#130754" d="M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,2 c7.732,0,14,6.268,14,14s-6.268,14-14,14S2,23.732,2,16S8.268,2,16,2z"/>
          <path fill="#130754" d="M15,6v7H8v2h7v9h2v-9h7v-2h-7V6H15z"/>
          <path fill="#FFCA00" d="M12,10c0,1.105-0.895,2-2,2s-2-0.895-2-2s0.895-2,2-2S12,8.895,12,10z"/>
          <path fill="#E70488" d="M24,10c0,1.105-0.895,2-2,2s-2-0.895-2-2s0.895-2,2-2S24,8.895,24,10z"/>
        </svg>
      )
    },
    { 
      name: "CUDA", 
      icon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path fill="#76B900" d="M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,2 c7.732,0,14,6.268,14,14s-6.268,14-14,14S2,23.732,2,16S8.268,2,16,2z"/>
          <path fill="#76B900" d="M8,12v8h2v-8H8z M12,8v16h2V8H12z M16,12v8h2v-8H16z M20,8v16h2V8H20z M24,12v8h2v-8H24z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
      {/* Shadow at the end */}
      <div className="absolute bottom-0 left-0 w-full h-24 "></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >   
            <h2 className="text-4xl md:text-5xl lg:text-6xl  mb-8 leading-tight">
              Powered by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">cutting-edge</span> technology
            </h2>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Our brain tumor detection system leverages state-of-the-art machine learning frameworks and computer vision libraries to deliver exceptional accuracy and performance.
            </p>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              We continuously update our technology stack to incorporate the latest advancements in AI research, ensuring our platform remains at the forefront of medical imaging analysis.
            </p>
          </motion.div>
          
          {/* Right column - Tech stack with opposite scrolling animations */}
          <div className="relative h-[500px] overflow-hidden">
            {/* First column of tech stack */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 space-y-6"
              initial={{ y: 300 }}
              animate={{ 
                y: -500,
                transition: {
                  duration: 25,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }
              }}
            >
              {[...techStack1, ...techStack1, ...techStack1].map((tech, index) => (
                <motion.div
                  key={`tech1-${index}`}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gray-100 p-3 rounded-full">
                    {tech.icon}
                  </div>
                  <span className="font-medium text-lg">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Second column of tech stack - scrolling in opposite direction */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 space-y-6 pl-4"
              initial={{ y: -500 }}
              animate={{ 
                y: 300,
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }
              }}
            >
              {[...techStack2, ...techStack2, ...techStack2].map((tech, index) => (
                <motion.div
                  key={`tech2-${index}`}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gray-100 p-3 rounded-full">
                    {tech.icon}
                  </div>
                  <span className="font-medium text-lg">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;