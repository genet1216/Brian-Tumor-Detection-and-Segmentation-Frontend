import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Brain regions data with tumor-related information
const brainRegions = [
  {
    id: 'cerebrum',
    name: 'Cerebrum',
    color: '#ff6b6b',
    description: 'The cerebrum is the most common location for gliomas, which make up about 30% of all brain tumors. These tumors arise from glial cells and can range from slow-growing to highly aggressive.',
    statistics: '70% of brain tumors occur in the cerebrum',
    svgPath: 'M80,50 C120,30 160,50 170,90 C180,130 150,170 100,180 C50,170 20,130 30,90 C40,50 60,30 80,50 Z',
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    color: '#4ecdc4',
    description: 'The cerebellum can develop medulloblastomas, which are fast-growing tumors most common in children. These account for about 20% of all childhood brain tumors.',
    statistics: '10% of brain tumors occur in the cerebellum',
    svgPath: 'M60,160 C80,150 120,150 140,160 C150,170 150,190 100,200 C50,190 50,170 60,160 Z',
  },
  {
    id: 'brainstem',
    name: 'Brain Stem',
    color: '#ffd166',
    description: 'Brainstem gliomas are often difficult to treat due to their location. They account for about 10-15% of all pediatric brain tumors and are typically diffuse and infiltrative.',
    statistics: '5% of brain tumors occur in the brain stem',
    svgPath: 'M90,190 C110,190 110,220 100,240 C90,220 90,190 90,190 Z',
  },
  {
    id: 'pituitary',
    name: 'Pituitary Gland',
    color: '#06d6a0',
    description: 'Pituitary adenomas are usually benign tumors that develop in the pituitary gland. They can cause hormonal imbalances and vision problems due to pressure on the optic nerves.',
    statistics: '15% of brain tumors are pituitary adenomas',
    svgPath: 'M95,140 C105,140 110,150 100,155 C90,150 95,140 95,140 Z',
  },
  {
    id: 'meninges',
    name: 'Meninges',
    color: '#118ab2',
    description: 'Meningiomas develop in the meninges, the protective layers surrounding the brain. They are typically slow-growing and benign, accounting for about 30% of all primary brain tumors.',
    statistics: '30% of brain tumors are meningiomas',
    svgPath: 'M40,80 C30,120 40,160 100,210 C160,160 170,120 160,80 C140,40 60,40 40,80 Z M60,70 C140,70 140,170 100,190 C60,170 60,70 60,70 Z',
  }
];

const BrainVisualization = () => {
  const [selectedRegion, setSelectedRegion] = useState('cerebrum');
  const [isRotating, setIsRotating] = useState(true);
  const selectedRegionData = brainRegions.find(region => region.id === selectedRegion);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className=" mx-auto mb-16"
        >
           <h3 className='text-3xl text-blue-700'>Brain Visualization</h3>
          <p className="text-3xl w-[1000px] ">
            Explore different regions of the brain and learn about common tumor types that can develop in each area. 
            Click on different parts to see detailed information.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Brain Visualization using SVG */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="h-[500px] bg-white rounded-xl shadow-lg overflow-hidden relative flex items-center justify-center"
          >
            <motion.div
              animate={isRotating ? { rotateY: [0, 10, 0, -10, 0] } : {}}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <svg 
                viewBox="0 0 200 250" 
                width="80%" 
                height="80%" 
                className="brain-svg"
              >
                {/* Brain outline */}
                <path 
                  d="M40,80 C30,120 40,160 100,210 C160,160 170,120 160,80 C140,40 60,40 40,80 Z" 
                  fill="#f8f9fa" 
                  stroke="#e9ecef" 
                  strokeWidth="1"
                />
                
                {/* Brain regions */}
                {brainRegions.map((region) => (
                  <path
                    key={region.id}
                    d={region.svgPath}
                    fill={selectedRegion === region.id ? region.color : '#f8f9fa'}
                    stroke={region.color}
                    strokeWidth="1.5"
                    opacity={selectedRegion === region.id ? 0.8 : 0.5}
                    style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                    onClick={() => setSelectedRegion(region.id)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.opacity = '0.7';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.opacity = selectedRegion === region.id ? '0.8' : '0.5';
                    }}
                  />
                ))}
                
                {/* Labels */}
                {brainRegions.map((region) => {
                  // Calculate label position based on the region
                  let labelX, labelY;
                  switch(region.id) {
                    case 'cerebrum':
                      labelX = 100; labelY = 80;
                      break;
                    case 'cerebellum':
                      labelX = 100; labelY = 170;
                      break;
                    case 'brainstem':
                      labelX = 100; labelY = 220;
                      break;
                    case 'pituitary':
                      labelX = 100; labelY = 145;
                      break;
                    case 'meninges':
                      labelX = 30; labelY = 120;
                      break;
                    default:
                      labelX = 100; labelY = 100;
                  }
                  
                  return (
                    <g key={`label-${region.id}`} className="hidden lg:block">
                      <circle 
                        cx={labelX} 
                        cy={labelY} 
                        r="2" 
                        fill={region.color} 
                      />
                      <text 
                        x={labelX + 5} 
                        y={labelY + 1} 
                        fontSize="6" 
                        fill={selectedRegion === region.id ? region.color : "#6c757d"}
                        fontWeight={selectedRegion === region.id ? "bold" : "normal"}
                        style={{ pointerEvents: 'none' }}
                      >
                        {region.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </motion.div>
            
            {/* Controls */}
            <div className="absolute bottom-4 right-4">
              <button 
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => setIsRotating(!isRotating)}
                title={isRotating ? "Pause rotation" : "Resume rotation"}
              >
                {isRotating ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>
            </div>
            
            {/* Mobile region selector (visible on small screens) */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4">
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {brainRegions.map((region) => (
                  <button
                    key={region.id}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                      selectedRegion === region.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setSelectedRegion(region.id)}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Information Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {selectedRegionData && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div 
                  className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
                  style={{ backgroundColor: selectedRegionData.color + '20' }}
                >
                  <div 
                    className="w-10 h-10 rounded-full"
                    style={{ backgroundColor: selectedRegionData.color }}
                  ></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{selectedRegionData.name}</h3>
                
                <div className="mb-6 inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                  {selectedRegionData.statistics}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedRegionData.description}
                </p>
                
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-semibold mb-3">Common Symptoms:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Headaches that worsen over time</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Seizures or convulsions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Vision or speech problems</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrainVisualization;