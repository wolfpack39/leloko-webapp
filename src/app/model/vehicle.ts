import { Job } from "./job";

export interface Vehicle {
    vehicleId: string;
    vehicleType: string;
    registrationNumber: string;
    fleetCount: number;
    jobs?: Job[];
    available: boolean;
}