import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from 'src/app/model/booking';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent {
  
  @Input() booking!: Booking
  @Input() dialogVisible = false
  constructor(
    private apiService: ApiService,
    private matSnackBar: MatSnackBar
  ){}

  updateStatus(){
    this.apiService.updateBookingStatus(this.booking.bookingStatus, this.booking.id).subscribe(response=>{
      this.matSnackBar.open("Status updated", "Ok")
      this.dialogVisible = false
    })
  }
}