import { Job } from '@/entities/Job';
import { JobSchedule } from "@/entities/JobSchedule";
import { changeHoursEmitter } from "@/events/ChangeHoursEmitter";
import { useBookingStore } from "@/store/bookingStore";
import { addMinutesToTime } from '@/utils/addMinutesToTime';
import { minutesToHoursFormatter } from '@/utils/minutesToHours';
import { format, addMinutes, parse } from "date-fns";
import { useEffect } from 'react';

interface JobCardProps {
    jobElement: JobSchedule;
    index: number;
}

export const JobCard = ({ jobElement, index }: JobCardProps) => {

    const { jobSchedule, removeJob, setCurrentJobChangeEmployee, goToEmployees } = useBookingStore();

    const hourChanged = (hours: string) => {
      jobSchedule?.jobs.forEach((job, index) => {
        if (jobSchedule) {

          if(index === 0) {
            jobSchedule.jobs[index].startTime = parse(hours, "HH:mm", jobSchedule.date);
            jobSchedule.jobs[index].endTime = parse(addMinutesToTime(hours, minutesToHoursFormatter(job.job.durationMinutes)), "HH:mm", jobSchedule.date);
          } else {
            jobSchedule.jobs[index].startTime = jobSchedule.jobs[index - 1].endTime;
            jobSchedule.jobs[index].endTime = addMinutes(jobSchedule.jobs[index - 1].endTime, job.job.durationMinutes);
          }
        }
      });
    }

    const handleRemoveJob = (jobId: string) => {
      jobSchedule?.jobs.forEach((job, index) => {
        if (jobSchedule) {
          if(index > 0) {
            job.startTime = jobSchedule.jobs[index - 1].startTime;
            job.endTime = jobSchedule.jobs[index - 1].endTime;
          }
        }
      });
      removeJob(jobId);
    }

    const handleChangeEmployee = (job: Job) => {
      setCurrentJobChangeEmployee(job);
      goToEmployees();
    }


    useEffect(() => {
      changeHoursEmitter.addListener('changeHours', (hours: string) => {
        hourChanged(hours);
      });
    }, []);
    return (
      <>
          <div key={jobElement.job.id} className='bg-gray-200 p-4 rounded-md mb-4 relative'>
        {jobSchedule?.jobs.length && jobSchedule.jobs.length > 1 && (
          <button 
            onClick={() => handleRemoveJob(jobElement.job.id)}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Remove job"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
        
        <div className="mb-4">
          <div>
            <h3 className="font-medium text-lg mb-2">{jobElement.job.name}</h3>
            <div className="flex justify-between text-gray-600">
              <span>R$ {jobElement.job.price}</span>
              {index === 0 && (
                <span> {format(jobElement.startTime, 'HH:mm')} - {format(jobElement.endTime, 'HH:mm')}</span>
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
      
      </>
    )
}