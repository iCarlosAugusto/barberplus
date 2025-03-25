import { Employee } from "@/entities/Employee";
import { Job } from "./Job";

export interface Schedule {
    id: string;
    date: Date;
    jobs: JobSchedule[]
}

export interface JobSchedule {
    job: Job;
    employee: Employee | null;
    startTime: Date;
    endTime: Date;
}