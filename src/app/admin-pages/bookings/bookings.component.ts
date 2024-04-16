import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = []

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
      this.apiService.getBookings().subscribe(bookings=>{
        this.bookings = bookings;
      })
  }

}
