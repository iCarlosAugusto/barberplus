import { useEffect, useState } from 'react'
import { BeautyDatePicker } from "@/components/InlineCalendar";
import { useBookingStore } from "@/store/bookingStore";
import { api } from '@/http/request';
import { addMinutesToTime } from '@/utils/addMinutesToTime';
import { minutesToHoursFormatter } from '@/utils/minutesToHours';
import { useCompanyStore } from '@/store/companyStore';
import { Job } from '@/entities/Job';
import { format } from 'date-fns';

export function Home() {
  const {  jobSchedule, goToServices, goToEmployees, setCurrentJobChangeEmployee, updateJob } = useBookingStore();
  const { company } = useCompanyStore();

    const [selectedPeriod, setSelectedPeriod] = useState<string>('Manhã');
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [availableHoursSlot, setAvailableHoursSlot] = useState<string[]>([]);

    const getTimesByPeriod = () => {
        switch (selectedPeriod) {
          case 'Manhã':
            return availableHoursSlot;
          case 'Tarde':
            return availableHoursSlot;
          case 'Noite':
            return availableHoursSlot;
          default:
            return availableHoursSlot;
        }
      };

  const updateFirstJob = (timeSlot: string) => {

    // if(jobSchedule){
    //   updateJob(jobSchedule.jobs[0].job.id, {
    //     ...jobSchedule?.jobs[0].job,
    //     startTime: selectedTime,
    //     endTime: addMinutesToTime(selectedTime, minutesToHoursFormatter(jobSchedule?.jobs[0].job.durationMinutes))
    //   })
    // }

  }

  const fetchCompanyTimeSlots = async (date: Date) => {
    const datePickedFormatted = format(date, 'yyyy-MM-dd');

    setIsLoading(true);
    try {
      const { data } = await api.get(`/companies/${company?.id}/time-slots?date=${datePickedFormatted}`);
      setAvailableHoursSlot(data);
      setSelectedTime(data[0])
      updateFirstJob(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangeEmployee = (job: Job) => {
    setCurrentJobChangeEmployee(job);
    goToEmployees();
  }
  
  useEffect(() => {
    fetchCompanyTimeSlots(new Date());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    
      {isLoading && <div>Carregando...</div>}
      <BeautyDatePicker
        onDateSelect={(date) => fetchCompanyTimeSlots(date)}
      />
      {!isLoading && selectedTime && (
        <>
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
      {jobSchedule?.jobs.map((jobElement, index) => (
        <div key={jobElement.job.id} className='bg-gray-200 p-4 rounded-md mb-4'>
          <div className="mb-4">
              <div>
                <h3 className="font-medium text-lg mb-2">{jobElement.job.name}</h3>
                <div className="flex justify-between text-gray-600">
                  <span>R$ {jobElement.job.price}</span>
                  {index === 0 && (
                    <span>{selectedTime} - {addMinutesToTime(selectedTime, minutesToHoursFormatter(jobElement.job.durationMinutes))}</span>
                  )}
                  {index > 0 && (
                    <span>{format(jobElement.startTime, 'HH:mm')} - {format(jobElement.endTime, 'HH:mm')}</span>
                  )}
                </div>
              </div>
  
          </div>
          
          <div className="flex items-center mb-4">
            <span className="mr-2">Funcionário:</span>
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/30" 
                alt="Barber" 
                className="w-7 h-7 rounded-full mr-2"
              />
              <span>{jobElement.employee?.name ?? "Sem preferencia"}</span>
            </div>
            <button onClick={() => handleChangeEmployee(jobElement.job)}>Trocar barbeiro</button>
          </div>
        </div>
      ))}
        
  
        
        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <span className="text-gray-600">Total:</span>
            <span className="text-xl font-bold ml-2">R$ {"TODO"}</span>
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
      )}  
    </>
  )
}