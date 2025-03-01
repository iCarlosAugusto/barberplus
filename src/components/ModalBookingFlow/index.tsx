import React from 'react';
import { BeautyModal } from '../Modal';
import AvailableServices from './AvailableServices';
import { useBookingStore } from '../../store/bookingStore';
import { Home } from './Home';
import { AvailableEmployees } from './AvailableEmployees';
interface ModalBookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalBookingFlow: React.FC<ModalBookingFlowProps> = ({ isOpen, onClose }) => {
  // Use the booking store instead of local state
  const { currentContent, goToHome } = useBookingStore();
  
  // Determine the title based on the current content
  const getTitle = () => {
    switch (currentContent) {
      case 'home':
        return 'Agendar Serviço';
      case 'services':
        return 'Escolha um Serviço';
      case 'employees':
        return 'Escolha um funcionário';
      case 'confirmation':
        return 'Confirmar Agendamento';
      default:
        return 'Agendar Serviço';
    }
  };
  
  // Determine if we should show the back button
  const shouldShowBackButton = currentContent !== 'home';
  
  // Handle back button click based on current content
  const handleBackButtonClick = () => {
    if (currentContent !== 'home') {
      goToHome();
    }
  };
  
  // Render the appropriate content based on the current step
  const renderContent = () => {
    switch (currentContent) {
      case 'home':
        return <Home />;
      case 'services':
        return <AvailableServices />;
      case 'employees':
        return <AvailableEmployees />;
      default:
        return <Home />;
    }
  };
  
  return (
    <BeautyModal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      showBackButton={shouldShowBackButton}
      onBackButtonClick={handleBackButtonClick}
    >
      {renderContent()}
    </BeautyModal>
  );
};

export default ModalBookingFlow;
