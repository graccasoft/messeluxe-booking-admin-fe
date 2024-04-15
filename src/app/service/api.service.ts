import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from '../model/unit';
import { Booking } from '../model/booking';
import { Observable } from 'rxjs';
import { Guest } from '../model/guest';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseEndPoint = '/api/backoffice';
  constructor(private httpClient: HttpClient) { }

  private getPropertyUnits(propertyId: number): Observable<Unit[]>{
    return this.httpClient.get<Unit[]>(`${this.apiBaseEndPoint}/properties/${propertyId}/units`)
  }

  private getUnit(id: number, propertyId: number): Observable<Unit>{
    return this.httpClient.get<Unit>(`${this.apiBaseEndPoint}/properties/${propertyId}/units/${id}`)
  }

  private getUnits(propertyId: number): Observable<Unit[]>{
    return this.httpClient.get<Unit[]>(`${this.apiBaseEndPoint}/properties/${propertyId}/units`)
  }

  private saveUnit(unit:Unit, propertyId: number): Observable<Unit>{
    return this.httpClient.post<Unit>(`${this.apiBaseEndPoint}/properties/${propertyId}/units`, unit);
  }

  private saveProperty(unit:Unit): Observable<Unit>{
    return this.httpClient.post<Unit>(`${this.apiBaseEndPoint}/properties/`, unit)
  }

  private saveBooking(booking: Booking): Observable<Booking>{
    return this.httpClient.post<Booking>(`${this.apiBaseEndPoint}/bookings`, booking);
  }
  
  private getBookings(): Observable<Booking[]>{
    return this.httpClient.get<Booking[]>(`${this.apiBaseEndPoint}/bookings`)
  }

  private getBooking(id:number): Observable<Booking>{
    return this.httpClient.get<Booking>(`${this.apiBaseEndPoint}/bookings/${id}`)
  }

  private getGuests(): Observable<Guest>{
    return this.httpClient.get<Guest>(`${this.apiBaseEndPoint}/guests`)
  }


}
