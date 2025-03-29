import { Job } from "./job";

export interface Vehicle {
    id: string;
    description: string;
    registrationNumber: string;
    jobs?: Job[];
    available: boolean;
}