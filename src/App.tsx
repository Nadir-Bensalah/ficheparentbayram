import { useEffect, useState } from 'react';
import Background from './components/Background';
import ContactCard from './components/ContactCard';
import Footer from './components/Footer';

function App() {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // Update document title
    document.title = "Contact d'Urgence - Yacine";
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleModalToggle = (isOpen: boolean) => {
    setShowModal(isOpen);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-poppins text-slate-800">
      {/* Background with particles */}
      <Background />
      
      {/* Main content - centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
        <ContactCard 
          childName="Bayram Ben Salah"
          fatherName="Nadir"
          fatherPhone="06 10 35 42 59"
          motherName="Inès"
          motherPhone="06 59 93 38 62"
          address="76 Rue du Pr Christian Cabrol 80000 Amiens"
          onModalToggle={handleModalToggle}
        />
      </div>
      
      {/* Modal Backdrop */}
      {showModal && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"></div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;