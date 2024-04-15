import { Injectable } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Unit } from "../model/unit";

@Injectable()
export class UnitForm {
  form!: FormGroup<{
    name: FormControl<string | null>
    description: FormControl<string | null>
    maxGuests: FormControl<number | null>
    minBookingDate: FormControl<number | null>
    address: FormControl<string | null>
    city: FormControl<string | null>
    normalServices: FormControl<string | null>
    additionalServices: FormControl<string | null>
    dayPrice: FormControl<number | null>

  }>;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: this.fb.control<string | null>(null, Validators.required),
      description: this.fb.control<string | null>(null, Validators.required),
      maxGuests: this.fb.control<number | null>(null, Validators.required),
      minBookingDate: this.fb.control<number | null>(null, [Validators.required]),
      address: this.fb.control<string | null>(null, [Validators.required]),
      city: this.fb.control<string | null>(null, [Validators.required]),
      normalServices: this.fb.control<string | null>(null, [Validators.required]),
      additionalServices: this.fb.control<string | null>(null, [Validators.required]),
      dayPrice: this.fb.control<number | null>(null, [Validators.required]),
    });
  }
  get value(): Unit {
    return this.form.value as Unit;
  }
}