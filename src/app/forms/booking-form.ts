import { Injectable } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Booking } from "../model/booking";

@Injectable()
export class BookingForm {
  form!: FormGroup<{
    checkInDate: FormControl<Date | null>
    checkOutDate: FormControl<Date | null>
    methodOfPayment: FormControl<string | null>
    bookingEngine: FormControl<string | null>
    bookingCode: FormControl<string | null>
    extras: FormControl<string | null>
    otherGuestName: FormControl<string | null>

  }>;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        checkInDate: this.fb.control<Date | null>(null, Validators.required),
        checkOutDate: this.fb.control<Date | null>(null, Validators.required),
        methodOfPayment: this.fb.control<string | null>(null, Validators.required),
        bookingEngine: this.fb.control<string | null>(null, [Validators.required]),
        bookingCode: this.fb.control<string | null>(null, [Validators.required]),
        extras: this.fb.control<string | null>(null, [Validators.required]),
        otherGuestName: this.fb.control<string | null>(null, [Validators.required]),
    });
  }
  get value(): Booking {
    return this.form.value as Booking;
  }
}