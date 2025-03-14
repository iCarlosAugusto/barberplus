import { Employee } from "./Employee";

export interface Job {
    id: string;
    name: string;
    description: string;
    price: number;
    durationMinutes: number;
    doneByEmployees: Employee[];
}