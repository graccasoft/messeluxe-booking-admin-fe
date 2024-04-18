import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from 'src/app/model/booking';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  dialogVisible = false
  bookings: Booking[] = []
  booking!: Booking

  constructor(
    private apiService: ApiService,
    private matSnackBar: MatSnackBar
  ){}

  ngOnInit(): void {
      this.apiService.getBookings().subscribe(bookings=>{
        this.bookings = bookings;
      })
  }

  selectBooking(booking: Booking){
    this.booking = booking
    this.toggleDialogVisible(true)
  }

  updateStatus(){
    this.apiService.updateBookingStatus(this.booking.bookingStatus, this.booking.id).subscribe(response=>{
      this.matSnackBar.open("Status updated", "Ok")
      this.toggleDialogVisible(false);
    })
  }
  deleteBooking(id: number){
    if( !confirm('Are you sure') ){ return }
    this.apiService.deleteBooking(id).subscribe(response=>{
      this.matSnackBar.open("Booking deleted", "Ok")
      this.bookings = this.bookings.filter( booking=> { return booking.id != id } )
    })
  }

  toggleDialogVisible(visibility: boolean){
    this.dialogVisible = visibility;
  }

}
