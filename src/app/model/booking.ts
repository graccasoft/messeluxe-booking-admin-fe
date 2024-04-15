import { Guest } from "./guest";
import { Unit } from "./unit";

export interface Booking {
    id: number;
    unit: Unit;
    guest: Guest;
    checkInDate: Date;
    checkOutDate: Date;
    methodOfPayment: string;
    bookingEngine: string;
    bookingCode: string;
    extras: string;
    otherGuestName: string;
    bookingStatus: string;
}