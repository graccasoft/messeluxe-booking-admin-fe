import { Injectable } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Booking } from "../model/booking";
import { Unit } from "../model/unit";

@Injectable()
export class BookingForm {
  form!: FormGroup<{
    unit: FormControl<Unit | null>
    checkInDate: FormControl<Date | null>
    checkOutDate: FormControl<Date | null>
    methodOfPayment: FormControl<string | null>
    bookingEngine: FormControl<string | null>
    bookingCode: FormControl<string | null>
    extras: FormControl<string | null>
    otherGuestName: FormControl<string | null>
    total: FormControl<number | null>

  }>;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        unit: this.fb.control<Unit | null>(null, Validators.required),
        checkInDate: this.fb.control<Date | null>(null, Validators.required),
        checkOutDate: this.fb.control<Date | null>(null, Validators.required),
        methodOfPayment: this.fb.control<string | null>(null, Validators.required),
        total: this.fb.control<number | null>(null, Validators.required),
        bookingEngine: this.fb.control<string | null>(null, []),
        bookingCode: this.fb.control<string | null>(null, []),
        extras: this.fb.control<string | null>(null, []),
        otherGuestName: this.fb.control<string | null>(null, []),
    });
  }
  get value(): Booking {
    return this.form.value as Booking;
  }
}