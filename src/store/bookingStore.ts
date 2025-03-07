import { JobSchedule } from '@/entities/JobSchedule';
import { create } from 'zustand';

// Define the types for our store
export type BookingContent = 'home' | 'services' | 'employees' | 'confirmation';

interface BookingState {
  currentContent: BookingContent;
  selectedJobs: JobSchedule[];
  setCurrentContent: (content: BookingContent) => void;
  addJob: (job: JobSchedule) => void;
  removeJob: (jobId: string) => void;
  clearJobs: () => void;
  goToServices: () => void;
  goToHome: () => void;
  goToEmployees: () => void;
  goToConfirmation: () => void;
}

// Create the store
export const useBookingStore = create<BookingState>((set) => ({
  currentContent: 'home',
  selectedJobs: [],
  
  setCurrentContent: (content) => set({ currentContent: content }),
  
  // Add a service to the selected services
  addJob: (job) => 
    set((state) => ({
      selectedJobs: [...state.selectedJobs, job]
    })),

  removeJob: (jobId) => 
    set((state) => ({
      selectedJobs: state.selectedJobs.filter(job => job.id !== jobId)
    })),
  
  // Clear all selected services
  clearJobs: () => set({ selectedJobs: [] }),
  
  // Navigation helper methods
  goToServices: () => set({ currentContent: 'services' }),
  goToHome: () => set({ currentContent: 'home' }),
  goToEmployees: () => set({ currentContent: 'employees' }),
  goToConfirmation: () => set({ currentContent: 'confirmation' }),
})); 