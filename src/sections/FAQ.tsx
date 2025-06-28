import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqs = [
    {
      question: "How accurate is your brain tumor detection?",
      answer: "Our AI model achieves over 95% accuracy in detecting and classifying brain tumors, validated against expert radiologist diagnoses."
    },
    {
      question: "What types of brain tumors can your system detect?",
      answer: "Our system can detect and classify multiple types of brain tumors including gliomas, meningiomas, and pituitary tumors."
    },
    {
      question: "How long does the analysis take?",
      answer: "The analysis typically takes less than 30 seconds to process an MRI scan and provide comprehensive results."
    },
    {
      question: "Is my medical data secure?",
      answer: "Yes, we employ enterprise-grade encryption and comply with all medical data privacy regulations to ensure your data remains secure."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl mb-12 ">Frequently asked questions</h2>
        
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button 
                className={`w-full text-left p-6 rounded-lg flex justify-between items-center ${
                  openIndex === index ? 'bg-white shadow-md' : 'bg-white hover:bg-gray-100'
                }`}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="bg-white p-6 pt-0 rounded-b-lg shadow-md -mt-2">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;