import { create } from 'zustand';

// Define the types for our store
export type BookingContent = 'home' | 'services' | 'calendar' | 'confirmation';

interface BookingState {
  // Current content/step in the booking flow
  currentContent: BookingContent;
  // Selected services
  selectedServices: string[];
  // Actions to update the state
  setCurrentContent: (content: BookingContent) => void;
  addService: (serviceId: string) => void;
  removeService: (serviceId: string) => void;
  clearServices: () => void;
  // Navigation helpers
  goToServices: () => void;
  goToHome: () => void;
  goToCalendar: () => void;
  goToConfirmation: () => void;
}

// Create the store
export const useBookingStore = create<BookingState>((set) => ({
  currentContent: 'home',
  selectedServices: [],
  
  // Set the current content directly
  setCurrentContent: (content) => set({ currentContent: content }),
  
  // Add a service to the selected services
  addService: (serviceId) => 
    set((state) => ({
      selectedServices: [...state.selectedServices, serviceId]
    })),
  
  // Remove a service from the selected services
  removeService: (serviceId) => 
    set((state) => ({
      selectedServices: state.selectedServices.filter(id => id !== serviceId)
    })),
  
  // Clear all selected services
  clearServices: () => set({ selectedServices: [] }),
  
  // Navigation helper methods
  goToServices: () => set({ currentContent: 'services' }),
  goToHome: () => set({ currentContent: 'home' }),
  goToCalendar: () => set({ currentContent: 'calendar' }),
  goToConfirmation: () => set({ currentContent: 'confirmation' }),
})); 