import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// Import components
import Dashboard from "./dashboard";
import Analysis from "./sections/analysis";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import Header from "./components/Header";

// Import auth-related components and types
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Auth Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth Hook
export const useAuth = () => useContext(AuthContext);

// Auth Modal Component
interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const { login } = useAuth();

 

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      {/* Your existing AuthModal UI code here */}
    </dialog>
  );
};

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (!isAuthenticated) {
    setTimeout(() => setModalOpen(true), 0);
    return (
      <>
        <AuthModal open={modalOpen} onOpenChange={setModalOpen} />
        <Navigate to="/" replace />
      </>
    );
  }

  return <>{children}</>;
};

// Main App Component
function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AuthProvider> 
      <Toaster/> 
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard openAuthModal={() => setModalOpen(true)} />
                } 
              />
              <Route
                path="/analysis"
                element={
                  <ProtectedRoute>
                    <Analysis />
                  </ProtectedRoute>
                }
              />
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Global Auth Modal */}
          <AuthModal 
            open={modalOpen} 
            onOpenChange={setModalOpen} 
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Export types for use in other components
export type { AuthModalProps };

export default App;
