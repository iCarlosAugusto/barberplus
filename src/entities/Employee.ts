import { JobSchedule } from "./JobSchedule";
import { WorkSchedule } from "./WorkSchedule";

export interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    companyId: string;
    workSchedule: WorkSchedule[];
    jobSchedules: JobSchedule[];
}
