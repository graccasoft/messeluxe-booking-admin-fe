import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/model/unit';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties: Unit[] = []
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
      this.apiService.getUnits().subscribe(units=>{
        this.properties = units
      })
  }
}
