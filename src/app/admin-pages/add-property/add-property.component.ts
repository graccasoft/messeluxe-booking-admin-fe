import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UnitForm } from 'src/app/forms/unit-form';
import { Unit } from 'src/app/model/unit';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [UnitForm]
})
export class AddPropertyComponent {

  files: any[] = []

  cities = [
    "Beitbridge", "Bindura", "Binga",
    "Bulawayo", "Chegutu", "Chinhoyi", "Chiredzi",
    "Chitungwiza", "Chipinge", "Chimanimani", "Epworth",
    "Esigodini", "Gokwe", "Gweru", "Gwanda", "Harare",
    "Hopley", "Hwange", "Inyathi", "Kadoma", "Kariba", "Karoi",
    "Kwekwe", "Lupane", "Macheke", "Marondera", "Masvingo",
    "Mberengwa", "Mount Darwin", "Mvuma", "Mutare", "Mutoko", "Nyanga",
    "Norton", "Plumtree", "Redcliff", "Rusape", "Ruwa",
    "Shurugwi", "Tsholotsho", "Triangle", "Victoria Falls", "Zimunya",
    "Zvishavane"
  ];
  constructor(
    private apiService: ApiService,
    public form: UnitForm,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  fileUploaded(file: any) {
    this.files.push({ attachmentFileId: file.fileId, unitId: 0 });
  }

  submit() {
    this.apiService.saveProperty( this.form.value as Unit )
    .subscribe(response=>{

      this.files.map(file => {
        file.unitId = response.id
      })
      this.apiService.saveUnitAttachments(this.files, response.id, response.property.id).subscribe(filesResponse=>{
        this.snackBar.open('Property has been added')
        this.router.navigateByUrl('/admin/properties')
      })

      
    }) 
  }

}
