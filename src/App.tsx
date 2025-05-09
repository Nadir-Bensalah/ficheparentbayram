import { useEffect } from 'react';
import Background from './components/Background';
import ContactCard from './components/ContactCard';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Update document title
    document.title = "Contact d'Urgence - Yacine";
    
    return () => {
      // Cleanup if needed
    };
  }, []);



  return (
    <div className="relative w-full min-h-screen font-poppins text-slate-800">
      {/* Background with particles */}
      <Background />
      
      {/* Main content - centered */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 z-10">
        <ContactCard 
          childName="Bayram Ben Salah"
          fatherName="Nadir"
          fatherPhone="06 10 35 42 59"
          motherName="Inès"
          motherPhone="06 59 93 38 62"
          address="76 Rue du Pr Christian Cabrol 80000 Amiens"
        />
      </div>
      

      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;