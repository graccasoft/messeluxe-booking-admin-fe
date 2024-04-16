import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FileUpload } from '../model/file-upload';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private fileApiUrl = '/api/attachments';

  constructor(
    private http: HttpClient
  ) {
  }

  upload(file: any): Observable<FileUpload> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<FileUpload>(this.fileApiUrl, formData)
      .pipe(
        catchError(err => {
          //this.snackbar.open('Failed to upload file');
          return throwError(err);
        })
      );
  }
}
