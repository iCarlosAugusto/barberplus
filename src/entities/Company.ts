import { Employee } from "@/entities/Employee";
import { Job } from "@/entities/Job";

export interface Company {
    id: string;
    name: string;
    slug: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    jobs: Job[];
    employees: Employee[];
    createdAt: string;
    updatedAt: string;
}
