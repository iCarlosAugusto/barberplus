import { Employee } from '@/entities/Employee';
import { Job } from '@/entities/Job';
import { JobSchedule } from '@/entities/JobSchedule';
import { create } from 'zustand';

export type BookingContent = 'home' | 'services' | 'employees' | 'confirmation';

interface AddJobProps {
  job: Job;
  employee: Employee | null;
  startTime: Date;
  endTime: Date;
}

interface BookingState {
  currentContent: BookingContent;
  jobSchedule: JobSchedule | null;
  setCurrentContent: (content: BookingContent) => void;
  addJob: (props: AddJobProps) => void;
  removeJob: (jobId: string) => void;
  clearJobs: () => void;  
  goToServices: () => void;
  goToHome: () => void;
  goToEmployees: () => void;
  goToConfirmation: () => void;
  currentJobChangeEmployee: null | Job;
  setCurrentJobChangeEmployee: (job: Job) => void;
  clearCurrentJobChangeEmployee: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentContent: 'home',
  jobSchedule: null,
  selectedJobs: [],
  currentJobChangeEmployee: null,
  
  setCurrentContent: (content) => set({ currentContent: content }),
  
  addJob: ({job, employee, startTime, endTime}: AddJobProps ) => 
    set((state) => {
      if (!state.jobSchedule) {
        // Criar um novo JobSchedule quando não existe
        return { 
          jobSchedule: {
            id: crypto.randomUUID(),
            date: new Date(),
            jobs: [{
              job: job, 
              employee: employee, 
              startTime: startTime,
              endTime: endTime
            }]
          }
        };
      }
      
      return {
        jobSchedule: {
          ...state.jobSchedule,
          jobs: [...state.jobSchedule.jobs, {
            job: job, 
            employee: employee, 
            startTime: startTime,
            endTime: endTime
          }]
        }
      };
    }),

  removeJob: (jobId) => 
    set((state) => {
      if (!state.jobSchedule) return { jobSchedule: null };
      
      return {
        jobSchedule: {
          ...state.jobSchedule,
          jobs: state.jobSchedule.jobs.filter(job => job.job.id !== jobId)
        }
      };
    }),
  
  // Clear all selected services
  clearJobs: () => set({ jobSchedule: null }),

  setCurrentJobChangeEmployee: (job: Job) => set({ currentJobChangeEmployee: job }),
  
  clearCurrentJobChangeEmployee: () => set({ currentJobChangeEmployee: null }),
  
  // Navigation helper methods
  goToServices: () => set({ currentContent: 'services' }),
  goToHome: () => set({ currentContent: 'home' }),
  goToEmployees: () => set({ currentContent: 'employees' }),
  goToConfirmation: () => set({ currentContent: 'confirmation' }),
})); 