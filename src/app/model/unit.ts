import { Property } from "./property";

export interface Unit {
    id: number;
    name: string;
    description: string;
    maxGuests: number;
    minBookingDate: number;
    address: string;
    city: string;
    normalServices: string;
    additionalServices: string;
    dayPrice: number;
    property: Property;
    attachments: any[]
}