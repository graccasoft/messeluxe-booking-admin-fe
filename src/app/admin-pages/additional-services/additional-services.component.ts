import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionalService } from 'src/app/model/additional-service';
import { AdditionalServicesService } from 'src/app/service/additional-services.service';

@Component({
  selector: 'app-additional-services',
  templateUrl: './additional-services.component.html',
  styleUrls: ['./additional-services.component.css']
})
export class AdditionalServicesComponent implements OnInit {

  services: AdditionalService[] = []
  dialogVisible: boolean = false;
  editingService: AdditionalService = {id: null, name:'', price:0, priceType1:'Person',priceType2:'Day'};
  constructor(
    private service: AdditionalServicesService,
    private matSnackBar: MatSnackBar
  ){}

  ngOnInit(): void {
     this.fetchServices();
  }

  fetchServices(){
    this.service.get().subscribe(services=>{
      this.services = services
    })
  }
  addService(){
    this.editingService = {id: null, name:'', price:0, priceType1:'Person',priceType2:'Day'};
    this.showDialog();
  }

  editService(eService: AdditionalService){
    this.editingService = eService
    this.showDialog();
  }

  showDialog() {
    this.dialogVisible = true;
  }

  save(){
    let request$ = this.service.save(this.editingService)
    if( this.editingService.id ){
      request$ = this.service.update(this.editingService)
    }
    request$.subscribe(response=>{
      this.matSnackBar.open("Service has been saved","Ok")
      this.fetchServices();
      this.dialogVisible = false;
    })
  }


}
