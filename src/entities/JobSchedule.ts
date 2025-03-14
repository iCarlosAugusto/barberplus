import { Employee } from "@/entities/Employee";
import { Job } from "./Job";

export interface JobSchedule {
    id: string;
    employee: Employee | null;
    job: Job
    date: Date;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
}