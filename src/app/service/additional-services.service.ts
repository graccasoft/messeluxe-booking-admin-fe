import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdditionalService } from '../model/additional-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServicesService {

  private apiBaseEndPoint = '/api/backoffice/additional-services';
  constructor(private httpClient: HttpClient) { }

  get(): Observable<AdditionalService[]>{
    return this.httpClient.get<AdditionalService[]>(`${this.apiBaseEndPoint}`)
  }

  save(additionalService: AdditionalService): Observable<AdditionalService>{
    return this.httpClient.post<AdditionalService>(`${this.apiBaseEndPoint}`, additionalService)
  }
  update(additionalService: AdditionalService): Observable<AdditionalService>{
    return this.httpClient.put<AdditionalService>(`${this.apiBaseEndPoint}/${additionalService.id}`, additionalService)
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.apiBaseEndPoint}/${id}`)
  }
}
