import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { FileUpload } from 'src/app/model/file-upload';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ]
})
export class FileUploadComponent {
  @Input() label = "Upload File"
  @Input() chooseFileLabel = "Choose file"
  @Input() fileType = "logo"
  @Output() fileUploadedEvent = new EventEmitter<any>()
  uploadedFileName = ""
  onChange: any = () => {
  };
  onTouched: any = () => {
  };
  loading = false;
  imageUrl: any = null;

  constructor(
    private fileUploadService: FileUploadService,
  ) {
  }

  select(event: any) {
    //console.log(event)

    if(event.originalEvent.body){
      this.uploadedFileName = event.files[0].name
      this.fileUploadedEvent.emit( { fileId: event.originalEvent.body.id, fileType: this.fileType } )
    }
    
  }

  private getFileUrl(fileUpload: FileUpload) {

    this.imageUrl =!fileUpload?null: `/api/attachments/${fileUpload.id}`
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: FileUpload): void {
    // fetch file and display in preview pane
    this.getFileUrl(obj);
    if (!obj) {
      return;
    }
  }
}
