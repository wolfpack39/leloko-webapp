import { Job } from "./job";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress?: string;
    jobs?: Job[];
}