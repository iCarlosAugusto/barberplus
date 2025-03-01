import React, { useState } from 'react'
import { BeautyModal } from '../Modal';

import { Haircut } from '../../services/haircutService';
import { Home } from './Home';
import AvailableServices from './AvailableServices';

interface ModalBookingFlowProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  selectedService: Haircut;
}

export function ModalBookingFlow({ showModal, setShowModal, selectedService }: ModalBookingFlowProps) {


    const [currentContext, setCurrentContext] = useState<'availableServices' | 'home'>('home');

  return (
    <BeautyModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title={currentContext === 'availableServices' ? "Selecione um horário" : "Selecione um serviço"}
      showBackButton={currentContext === 'availableServices'}
      onBackButtonClick={() => setCurrentContext('home')}
    >
    <>
      {currentContext === 'home' && <Home selectedService={selectedService} />}
      {currentContext === 'availableServices' && <AvailableServices />}
    </>
  </BeautyModal>
  )
}
