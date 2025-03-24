import { Driver } from "./driver"

export interface Job {
    id: string,
    submitDate: string,
    status: string,
    pickupAddress: string,
    destinationAddress: string,
    startTime: string,
    endTime: string,
    complete: boolean
    tripSelected: boolean
    driver: Driver
}