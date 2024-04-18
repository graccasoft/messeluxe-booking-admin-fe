import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from '../model/unit';
import { Booking } from '../model/booking';
import { Observable } from 'rxjs';
import { Guest } from '../model/guest';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseEndPoint = '/api/backoffice';
  constructor(private httpClient: HttpClient) { }

  getPropertyUnits(propertyId: number): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(`${this.apiBaseEndPoint}/properties/${propertyId}/units`)
  }
  getProperty(propertyId: number): Observable<Property> {
    return this.httpClient.get<Property>(`${this.apiBaseEndPoint}/properties/${propertyId}`)
  }
  getProperties(): Observable<Property[]> {
    return this.httpClient.get<Property[]>(`${this.apiBaseEndPoint}/properties`)
  }

  updateProperty(property: Property): Observable<Property> {
    return this.httpClient.put<Property>(`${this.apiBaseEndPoint}/properties/${property.id}`, property)
  }

  getUnit(id: number, propertyId: number): Observable<Unit> {
    return this.httpClient.get<Unit>(`${this.apiBaseEndPoint}/properties/${propertyId}/units/${id}`)
  }

  getUnits(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(`${this.apiBaseEndPoint}/properties/units`)
  }

  saveUnit(unit: Unit, propertyId: number): Observable<Unit> {
    return this.httpClient.post<Unit>(`${this.apiBaseEndPoint}/properties/${propertyId}/units`, unit);
  }
  updateUnit(unit: Unit, propertyId: number): Observable<Unit> {
    return this.httpClient.put<Unit>(`${this.apiBaseEndPoint}/properties/${propertyId}/units/${unit.id}`, unit)
  }

  saveUnitAttachments(attachments: any[], unitId: number, propertyId: number): Observable<Unit> {
    return this.httpClient.post<Unit>(`${this.apiBaseEndPoint}/properties/${propertyId}/units/${unitId}/attachments`, attachments);
  }

  saveProperty(unit: Unit): Observable<Unit> {
    return this.httpClient.post<Unit>(`${this.apiBaseEndPoint}/properties`, unit)
  }

  saveBooking(booking: Booking): Observable<Booking> {
    return this.httpClient.post<Booking>(`/api/bookings`, booking);
  }

  getBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.apiBaseEndPoint}/bookings`)
  }

  getBooking(id: number): Observable<Booking> {
    return this.httpClient.get<Booking>(`${this.apiBaseEndPoint}/bookings/${id}`)
  }

  getGuests(): Observable<Guest[]> {
    return this.httpClient.get<Guest[]>(`${this.apiBaseEndPoint}/guests`)
  }

  updateBookingStatus(status: string, id: number): Observable<Booking> {
    const payload = {
      bookingStatus: status
    }
    return this.httpClient.patch<Booking>(`${this.apiBaseEndPoint}/bookings/${id}/status`, payload)
  }

  deleteBooking(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiBaseEndPoint}/bookings/${id}`)
  }

  getBookableProperties(): Observable<Property[]> {
    return this.httpClient.get<Property[]>(`${this.apiBaseEndPoint}/properties/bookable-properties`)
  }


}
