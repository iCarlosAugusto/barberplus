import { Company } from '@/entities/Company';
import { Job } from '@/entities/Job';
import { create } from 'zustand';

interface CompanyState {
  company: Company | null;
  companyJobs: Job[];
  setCompanyJobs: (jobs: Job[]) => void;
  setCompany: (company: Company) => void;
  clearCompany: () => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  company: null,
  companyJobs: [],
  setCompany: (company) => set({ company }),
  
  clearCompany: () => set({ company: null }),

  setCompanyJobs: (jobs) => set({ companyJobs: jobs }),

}));
