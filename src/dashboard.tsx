import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Features from './sections/Features';
import AICapabilities from './sections/AICapabilities';
import CaseStudies from './sections/CaseStudies';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Technology from './sections/Technology';
import BrainVisualization from './sections/BrainVisualization'; 

const Dashboard = () => {
  return (
    <div className="min-h-screen font-sans">
      
      
      <main>
        <Hero />
        <Features />
        <AICapabilities />
        <Technology /> 
        <BrainVisualization />
        <CaseStudies />
        <FAQ />
        <CTA />
      </main>
      
    </div>
  );
};

export default Dashboard;