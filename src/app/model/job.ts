import { Client } from "./client"
import { User } from "./user";
import { Vehicle } from "./vehicle";

export interface Job {
    id: string;
    submitDate: Date;
    communicationChannel: string;
    stillages?: string;
    pickupAddress: string;
    destinationAddress: string;
    plannedStartDate: Date;
    actualStartDate: Date;
    actualEndDate: Date;
    client?: Client;
    vehicle?: Vehicle;
    driver?: User;
    status: string;
}