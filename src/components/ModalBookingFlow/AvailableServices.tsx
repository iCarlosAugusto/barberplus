import { useBookingStore } from "@/store/bookingStore";
import { useCompanyStore } from '@/store/companyStore';
import { Job } from '@/entities/Job';
import { addMinutes } from "date-fns";

const AvailableServices: React.FC = () => {
  const { addJob, jobSchedule, goToHome } = useBookingStore();
  const { companyJobs } = useCompanyStore();
  
  const handleSelectJob = (_: Job) => {

    const fakeJob: Job = {
      id: "123",
      name: "teste",
      description: "teste",
      price: 100,
      durationMinutes: 30,
      doneByEmployees: [],
    }
    const lastJob = jobSchedule?.jobs[jobSchedule?.jobs.length - 1];

    const startTimeStr = addMinutes(lastJob!.endTime, 10).toISOString();
    const startTime = new Date(startTimeStr);
    
    const endTimeStr = addMinutes(startTime, fakeJob.durationMinutes).toISOString();
    const endTime = new Date(endTimeStr);

    addJob({
      job: fakeJob,
      employee: null,
      startTime: startTime,
      endTime: endTime
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
