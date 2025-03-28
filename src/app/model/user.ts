import { Job } from "./job";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress?: string;
    jobs?: Job[];
}