import { Client } from "./client"
import { Driver } from "./driver"
import { Vehicle } from "./vehicle";

export interface Job {
    id: string;
    submitDate: string;
    status: string;
    pickupAddress: string;
    destinationAddress: string;
    startTime: string;
    endTime: string;
    complete: boolean;
    tripSelected: boolean;
    driver: Driver;
    client: Client;
    dateSubmitted: string;
    plannedDate: string;
    startDate: string;
    endDate: string;
    vehicle?: Vehicle;
}