import { Job } from "./job";

export interface Driver {
    driverId: string;
    driverName: string;
    driverSurname: string;
    jobs: Job[];
}