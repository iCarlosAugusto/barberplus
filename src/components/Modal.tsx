import React, { useState, useEffect } from 'react';

interface BeautyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BeautyModal: React.FC<BeautyModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  
  useEffect(() => {
    // Handle open/close state changes
    if (isOpen) {
      setIsVisible(true);
      // Add overflow hidden class to prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Delay hiding to allow animation to complete
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Remove overflow hidden
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  // Don't render anything if not visible
  if (!isVisible) return null;

  // Close when clicking the backdrop (not the modal itself)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    document.body.style.overflow = '';
  }

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center p-4 bg-black/30 backdrop-blur transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      style={{ zIndex: 50 }}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white/95 rounded-lg shadow-xl w-full max-w-md transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'} ${className}`}
        style={{ zIndex: 60, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header with Decorative Top Border */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"></div>
          <div className="flex items-center justify-between p-4 border-b mt-1">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-1.5 inline-flex items-center"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Usage example component
const ExampleComponent: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div>
      <button 
        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        onClick={() => setModalOpen(true)}
      >
        Open Beauty Modal
      </button>
      
      <BeautyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Beauty Products"
        className="border-pink-200"
      >
        <div className="space-y-4">
          <p className="text-gray-700">Discover our exclusive beauty collection for radiant skin.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-md text-center hover:shadow transition">
              <div className="font-medium">Facial Serum</div>
              <div className="text-pink-500">$42.99</div>
            </div>
            <div className="p-3 border rounded-md text-center hover:shadow transition">
              <div className="font-medium">Night Cream</div>
              <div className="text-pink-500">$38.99</div>
            </div>
          </div>
          
          <button 
            className="w-full mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </BeautyModal>
    </div>
  );
};

export { BeautyModal, ExampleComponent };