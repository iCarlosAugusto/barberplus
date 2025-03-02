import { Employee } from "@/entities/Employee";

export interface JobSchedule {
    id: string;
    employee: Employee;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
}