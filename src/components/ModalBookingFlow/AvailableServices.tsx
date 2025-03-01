import React, { useState } from 'react';
import { useBookingStore } from '../../store/bookingStore';
// Import your service data or API functions
import { getServices, getServiceById } from '../../services/haircutService';

const AvailableServices: React.FC = () => {
  const { addService, goToHome, selectedServices } = useBookingStore();
  const services = getServices();
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  
  // Handle selecting a service
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceIds(prev => [...prev, serviceId]);
    addService(serviceId);
  };
  
  // Check if a service is already selected
  const isServiceSelected = (serviceId: string) => {
    return selectedServices.includes(serviceId);
  };
  
  // Calculate total price of selected services
  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = getServiceById(serviceId);
      return total + (service?.price || 0);
    }, 0);
  };
  
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Escolha um serviço para agendar:
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleSelectService(service.id)}
            className={`p-4 border rounded-lg transition-colors duration-200 flex justify-between items-center ${
              isServiceSelected(service.id) 
                ? 'bg-pink-50 border-pink-300' 
                : 'bg-white hover:bg-gray-50 border-gray-200'
            }`}
            disabled={isServiceSelected(service.id)}
          >
            <div>
              <div className="flex items-center">
                {isServiceSelected(service.id) && (
                  <svg className="w-5 h-5 text-pink-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                )}
                <span className="text-lg font-medium text-gray-800">{service.name}</span>
              </div>
              <p className="text-sm text-gray-600">{service.description}</p>
              <p className="text-sm text-gray-500 mt-1">{service.duration} min</p>
            </div>
            <span className="text-lg font-semibold text-gray-800">R$ {service.price.toFixed(2)}</span>
          </button>
        ))}
      </div>
      
      {selectedServices.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Serviços selecionados:</h3>
            {selectedServices.map(serviceId => {
              const service = getServiceById(serviceId);
              return service ? (
                <div key={service.id} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                  <span>{service.name}</span>
                  <span>R$ {service.price.toFixed(2)}</span>
                </div>
              ) : null;
            })}
            <div className="flex justify-between pt-2 font-semibold">
              <span>Total:</span>
              <span>R$ {calculateTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={goToHome}
              className="flex-1 py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableServices;
