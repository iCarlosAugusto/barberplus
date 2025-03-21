import { Employee } from "@/entities/Employee";
import { Job } from "./Job";

export interface JobSchedule {
    id: string;
    date: Date;
    jobs: {
        job: Job;
        employee: Employee | null;
        startTime: Date;
        endTime: Date;
    }[]
}