import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UnitForm } from 'src/app/forms/unit-form';
import { Unit } from 'src/app/model/unit';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [UnitForm]
})
export class AddPropertyComponent implements OnInit {

  files: any[] = []
  editingUnit!: Unit;
  propertyId = 0;

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      if( s['id'] ){
        this.apiService.getUnit(s['id'], 0).subscribe(unit => { 
          
            this.form.form.patchValue(unit);
            this.editingUnit = unit;

         })
      }
      if( s['propertyId'] ){
        this.propertyId = s['propertyId']
      }
    })
  }

  fileUploaded(file: any) {
    this.files.push({ attachmentFileId: file.fileId, unitId: 0 });
  }

  submit() {
    let saveRequest$ = this.apiService.saveProperty( this.form.value as Unit )

    if(this.propertyId > 0){
      saveRequest$ = this.apiService.saveUnit(this.form.value as Unit, this.propertyId)
    }
    if(this.editingUnit ){
      let unit = this.form.value as Unit;
      unit.id = this.editingUnit.id
      unit.property = this.editingUnit.property
      saveRequest$ = this.apiService.updateUnit(this.form.value as Unit, unit.property.id)
    }
    
    saveRequest$.pipe(
      catchError(err=>{
        this.snackBar.open('Could not add new property')
        throw (err)
      })
    )
    .subscribe(response=>{

      this.files.map(file => {
        file.unitId = response.id
      })
      this.apiService.saveUnitAttachments(this.files, response.id, response.property.id)
      .pipe(
        catchError(err=>{
          this.snackBar.open('Could not upload property images', 'Ok')
          throw (err)
        })
      )
      .subscribe(filesResponse=>{
        this.snackBar.open('Property has been saved', 'Ok')
        this.router.navigateByUrl('/admin/properties')
      })

      
    }) 
  }

}
