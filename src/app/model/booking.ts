import { Guest } from "./guest";
import { Property } from "./property";
import { Unit } from "./unit";

export interface Booking {
    id: number;
    unit: Unit | null;
    guest: Guest;
    checkInDate: Date;
    checkOutDate: Date;
    methodOfPayment: string;
    bookingEngine: string;
    bookingCode: string;
    extras: string;
    otherGuestName: string;
    bookingStatus: string;
    total: number;
    property: Property | null;
}