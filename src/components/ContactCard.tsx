import { Phone, MapPin, Share2, X, Check } from 'lucide-react';
import { useState } from 'react';

interface ContactCardProps {
  childName: string;
  fatherName: string;
  fatherPhone: string;
  motherName: string;
  motherPhone: string;
  address: string;
}

const ContactCard = ({
  childName,
  fatherName,
  fatherPhone,
  motherName,
  motherPhone,
  address
}: ContactCardProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<{latitude: number, longitude: number} | null>(null);
  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const makePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
  };

  const getLocation = async () => {
    try {
      if ('geolocation' in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ latitude, longitude });
        setShowShareModal(true);
        return { latitude, longitude };
      }
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };

  const shareLocation = async () => {
    const position = await getLocation();
    if (!position) return;
  };
  
  const shareViaWhatsApp = (phone: string) => {
    if (!currentPosition) return;
    
    const { latitude, longitude } = currentPosition;
    const message = `Voici ma position actuelle: https://www.google.com/maps?q=${latitude},${longitude}`;
    const encodedMessage = encodeURIComponent(message);
    const cleanPhone = phone.replace(/\s+/g, '');
    
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
    setShareSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setShareSuccess(false);
      setShowShareModal(false);
    }, 3000);
  };
  
  const closeShareModal = () => {
    setShowShareModal(false);
    setShareSuccess(false);
  };
  
  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeShareModal();
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-center text-xl md:text-2xl font-medium mb-6 text-white leading-tight">
        Bonjour je suis Bayram, voici les infos de contact de mes parents
      </h1>
      
      <div className="glassmorphism p-6 rounded-3xl shadow-xl border border-white/30 backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {childName.charAt(0)}
          </div>
        </div>
        
        <h2 className="text-xl text-center font-bold mb-6 text-white/90">{childName}</h2>
        
        <div className="space-y-4">
          {/* Father's contact */}
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-lg mr-2">👨‍👦</span>
                <div>
                  <p className="text-sm font-medium text-white">{fatherName}</p>
                  <p className="text-xs text-white/70">{fatherPhone}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/90">Papa</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => makePhoneCall(fatherPhone)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-white/5 shadow-sm"
              >
                <Phone size={16} />
                <span>Appeler</span>
              </button>
              <button 
                onClick={() => openWhatsApp(fatherPhone)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <Phone size={16} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
          
          {/* Mother's contact */}
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-lg mr-2">👩‍👦</span>
                <div>
                  <p className="text-sm font-medium text-white">{motherName}</p>
                  <p className="text-xs text-white/70">{motherPhone}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/90">Maman</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => makePhoneCall(motherPhone)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-white/5 shadow-sm"
              >
                <Phone size={16} />
                <span>Appeler</span>
              </button>
              <button 
                onClick={() => openWhatsApp(motherPhone)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <Phone size={16} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
          
          {/* Address */}
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300 border border-white/10">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">🏠</span>
              <div>
                <p className="text-sm font-medium text-white">Adresse</p>
                <p className="text-xs text-white/70">{address}</p>
              </div>
            </div>
            <button 
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank')}
              className="w-full flex items-center justify-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              <MapPin size={16} />
              <span>Voir sur la carte</span>
            </button>
          </div>
        </div>

        {/* Share Location Button */}
        <button 
          onClick={shareLocation}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md font-medium"
        >
          <Share2 size={18} />
          <span>Partager ma position</span>
        </button>
        
        {/* Share Modal */}
        {showShareModal && (
          <>
            {/* Modal Backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9990]" onClick={handleBackdropClick}></div>
            
            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-[9999]" onClick={handleBackdropClick}>
              <div 
                className="bg-white p-6 rounded-[30px] w-full max-w-xs mx-4 animate-fadeIn shadow-xl border border-white/50" 
                onClick={(e) => e.stopPropagation()}
              >
              {!shareSuccess ? (
                <>
                  <div>
                    <div className="text-right">
                      <button 
                        onClick={closeShareModal}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-blue-600 text-center">Partager ma position</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-5 text-sm text-center">Choisissez avec qui partager ma position actuelle :</p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => shareViaWhatsApp(fatherPhone)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-3xl hover:bg-gray-100 text-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-gray-200"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-lg">👨‍👦</span>
                        </div>
                        <span className="font-medium">{fatherName} <span className="text-gray-500 text-sm">(Papa)</span></span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <Share2 size={15} />
                      </div>
                    </button>
                    <button 
                      onClick={() => shareViaWhatsApp(motherPhone)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-3xl hover:bg-gray-100 text-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-gray-200"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-lg">👩‍👦</span>
                        </div>
                        <span className="font-medium">{motherName} <span className="text-gray-500 text-sm">(Maman)</span></span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                        <Share2 size={15} />
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center py-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-5 shadow-md">
                    <Check size={36} className="text-white" />
                  </div>
                  <p className="text-gray-800 font-medium text-center text-lg">Position partagée avec succès!</p>
                </div>
              )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactCard;