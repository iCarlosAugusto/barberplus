import React, { useState } from 'react'
import { BeautyDatePicker } from '../InlineCalendar';
import { useBookingStore } from '../../store/bookingStore';


export function Home() {
  const {  selectedServices, goToServices } = useBookingStore();

    const [selectedPeriod, setSelectedPeriod] = useState<string>('Manhã');
    const [selectedTime, setSelectedTime] = useState<string>('');
    //const [selectedService, setSelectedService] = useState<Haircut | null>(selectedService);
    const [selectedBarber, setSelectedBarber] = useState<string>('Barbearia');
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const morningTimes = ['10:30', '10:45', '11:00', '11:15', '11:30', '11:45'];
    const afternoonTimes = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
    const eveningTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];

    const [currentContext, setCurrentContext] = useState<'availableServices' | 'home'>('home');

    const getTimesByPeriod = () => {
        switch (selectedPeriod) {
          case 'Manhã':
            return morningTimes;
          case 'Tarde':
            return afternoonTimes;
          case 'Noite':
            return eveningTimes;
          default:
            return morningTimes;
        }
      };
  return (
    <>
      <BeautyDatePicker />
      {/* Time Period Selection */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-3 gap-2">
          {['Manhã', 'Tarde', 'Noite'].map((period) => (
            <button 
              key={period}
              className={`py-2 px-4 rounded-md ${
                selectedPeriod === period 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      {/* Time Slots */}
      <div className="p-4 border-b">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button className="text-gray-500 hover:text-gray-700 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          {getTimesByPeriod().map((time) => (
            <button 
              key={time}
              className={`py-2 px-4 rounded-md flex-shrink-0 ${
                selectedTime === time 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
          
          <button className="text-gray-500 hover:text-gray-700 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Selected Service Summary */}
      <div className="p-4 bg-gray-50">
        <div className="mb-4">
          {selectedServices.map((service) => (
            <div key={service.id}>
              <h3 className="font-medium text-lg mb-2">{service.name}</h3>
              <div className="flex justify-between text-gray-600">
                <span>R$ 40,00</span>
                <span>10:30 - 11:30</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center mb-4">
          <span className="mr-2">Funcionário:</span>
          <div className="flex items-center">
            <img 
              src="https://via.placeholder.com/30" 
              alt="Barber" 
              className="w-7 h-7 rounded-full mr-2"
            />
            <span>{selectedBarber}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <span className="text-gray-600">Total:</span>
            <span className="text-xl font-bold ml-2">R$ {totalPrice.toFixed(2)}</span>
            <span className="text-gray-500 text-sm ml-2">1h</span>
          </div>
          
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              alert('Reserva confirmada!');
            }}
          >
            Continuar
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <button 
            className="text-blue-600 flex items-center justify-center mx-auto"
            onClick={() => {
              goToServices();
            
            }}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Adicionar outro serviço
          </button>
        </div>
      </div>
    </>
  )
}
