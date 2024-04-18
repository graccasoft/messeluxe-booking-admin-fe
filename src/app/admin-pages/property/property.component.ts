import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/model/property';
import { Unit } from 'src/app/model/unit';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  dialogVisible: boolean = false;
  property!: Property
  units: Unit[] = []
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      if (s['id']) {
        this.apiService.getProperty(s['id']).subscribe(property => { this.property = property })
        this.apiService.getPropertyUnits(s['id']).subscribe(units => { this.units = units })
      }
    })
  }

  showDialog() {
    this.dialogVisible = true;
  }

  editProperty(){
    this.apiService.updateProperty(this.property).subscribe(response=>{
      this.matSnackBar.open("Property successfully updated", 'Ok')
      this.dialogVisible = false
    })
  }
}
