import { Client } from "./client"
import { User } from "./user";
import { Vehicle } from "./vehicle";

export interface Job {
    id: string;
    submitDate: Date;
    communicationChannel: string;
    comments?: string;
    pickupAddress: string;
    destinationAddress: string;
    plannedStartDate: Date;
    actualStartDate: Date;
    actualEndDate: Date;
    client?: Client;
    vehicle?: Vehicle;
    user_id?: User;
    status: string;
}