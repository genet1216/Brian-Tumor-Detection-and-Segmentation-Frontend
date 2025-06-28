
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/components/AuthProvider';
import { useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleTryNow = () => {
    if (isAuthenticated) {
      navigate("/analysis");
    } else {
      setModalOpen(true);
    }
  };  

  return (
    <section className="pt-32 pb-20 overflow-hidden relative">
      {/* Square background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 [opacity:0.5]" 
          style={{
            backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}>
        </div>
                         
        {/* Square decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-100 opacity-90 rotate-12"></div>
        <div className="absolute bottom-40 right-40 w-48 h-48 border-2 border-purple-100 opacity-90 -rotate-6"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-50 opacity-90"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-purple-50 opacity-90 rotate-45"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The only platform powered by <span className="gradient-text">advanced AI</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Accurate brain tumor detection and classification with cutting-edge neural networks
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleTryNow} className="btn-primary">
              Try Now
            </button> 
            <AuthModal open={modalOpen} onOpenChange={setModalOpen} />  
            <Link to="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-xl shadow-card p-4 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center p-3 border-b border-gray-200 bg-white">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <img 
                src="/dash-main.png" 
                alt="BrainScan AI Dashboard" 
                className="max-w-full"
              />
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 bg-blue-100 rounded-full p-4 shadow-lg">
            <div className="bg-white rounded-full p-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2563EB" strokeWidth="2"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="#2563EB"/>
              </svg>
            </div>
          </div>
          
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-70 blur-xl"></div>
          <div className="absolute -bottom-20 right-20 w-60 h-60 bg-purple-50 rounded-full opacity-70 blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;