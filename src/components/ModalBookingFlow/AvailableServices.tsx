import { useBookingStore } from "@/store/bookingStore";
import { useCompanyStore } from '@/store/companyStore';
import { Job } from '@/entities/Job';
const AvailableServices: React.FC = () => {
  const { addJob, goToHome } = useBookingStore();
  const { companyJobs } = useCompanyStore();
  
  const handleSelectJob = (job: Job) => {
    //TODO - Arrumar
    addJob({
      job: job,
      employee: null,
      startTime: new Date(),
      endTime: new Date()
    });
    goToHome();
  };
  
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Escolha um serviço para agendar:
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        {companyJobs.map((currentJob) => (
          <button
            key={currentJob.id}
            onClick={() => handleSelectJob(currentJob)}
            className={'p-4 border rounded-lg transition-colors duration-200 flex justify-between items-center'}
          >
            <div className='flex flex-col items-start'>
              <span className="text-lg font-medium text-gray-800 bold">{currentJob.name}</span>
              <p className="text-sm text-gray-600">{currentJob.description}</p>
              <p className="text-sm text-gray-500">{"currentJob.duration TODO"} min</p>
            </div>
            <span className="text-lg font-semibold text-gray-800">R$ {currentJob.price.toFixed(2)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailableServices;
