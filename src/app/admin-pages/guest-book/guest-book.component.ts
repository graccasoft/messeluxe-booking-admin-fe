import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/model/guest';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  styleUrls: ['./guest-book.component.css']
})
export class GuestBookComponent implements OnInit {

  guests: Guest[] =[]
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
      this.apiService.getGuests().subscribe(guests=>{
        this.guests = guests
      })
  }
}
