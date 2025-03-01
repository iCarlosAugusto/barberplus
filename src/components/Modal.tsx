import React, { useState, useEffect } from 'react';

interface BeautyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
}

const BeautyModal: React.FC<BeautyModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  showBackButton = false,
  onBackButtonClick
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

  const handleBackClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    }
  }

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center sm:p-4 bg-black/30 backdrop-blur transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      style={{ zIndex: 50 }}
      onClick={handleBackdropClick}
    >
      <div 
        className={`overflow-y-auto max-h-[100vh] bg-white/95 rounded-lg shadow-xl w-full md:max-w-2xl transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'} ${className}`}
        style={{ zIndex: 60, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header with Decorative Top Border */}
        <div className="relative">
          <div className="flex items-center justify-between p-4 border-b mt-1">
            <div className="flex items-center">
              {showBackButton && (
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-1.5 inline-flex items-center mr-3"
                  onClick={handleBackClick}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                  </svg>
                  <span className="sr-only">Back</span>
                </button>
              )}
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-1.5 inline-flex items-center"
              onClick={handleClose}
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

export { BeautyModal };