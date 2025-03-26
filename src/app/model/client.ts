import { Job } from "./job";

export interface Client {
    id: string;
    name: string;
    address: string;
    contactNumber?: string;
    jobs?: Job[]
}