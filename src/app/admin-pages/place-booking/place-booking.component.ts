import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BookingForm } from 'src/app/forms/booking-form';
import { Guest } from 'src/app/model/guest';
import { Property } from 'src/app/model/property';
import { Unit } from 'src/app/model/unit';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-place-booking',
  templateUrl: './place-booking.component.html',
  styleUrls: ['./place-booking.component.css'],
  providers: [BookingForm]
})
export class PlaceBookingComponent implements OnInit {

  today = new Date()
  units: Unit[] = []
  guest: Guest = { name: '', surname: '', address: '', email: '', idNumber: '', nationality: '', phoneNumber: '' }

  constructor(
    public form: BookingForm,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getUnits().subscribe(units => {
      this.units.push(...units)
    })

    this.apiService.getBookableProperties().subscribe(properties => {
      properties.map(property => {

        this.units.push({
          name: property.name,
          additionalServices: "",
          address: property.address,
          attachments: [],
          city: property.city,
          dayPrice: property.price,
          description: property.description,
          id: property.id,
          isEntirePlace: true,
          maxGuests: 0,
          minBookingDate: 1,
          normalServices: "",
          property: property,
          extraServices:[]
        })

      })
    })
  }


  isValid() {
    return this.form.form.valid && (this.guest.name != "" && this.guest.surname != "")
  }

  submit() {

    let booking = this.form.value;
    booking.guest = this.guest
    booking.bookingEngine = "Website";
    if( booking.unit?.isEntirePlace ){
      booking.property = booking.unit.property;
      booking.unit = null
    }



    this.apiService.saveBooking(booking)
      .pipe(
        catchError(err => {
          this.snackBar.open('Booking could not be placed.', 'Ok')
          throw (err)
        })
      )
      .subscribe(response => {
        this.snackBar.open('Booking has been saved', 'Ok')
        this.router.navigateByUrl('/admin/bookings')
      })

  }
}
