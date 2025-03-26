import { Job } from "./job";

export interface Driver {
    id: string;
    firstName: string;
    lastName: string;
    jobs: Job[];
}