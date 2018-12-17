import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JobSearch';

  uploadUrl = 'http://localhost:3600/api/upload/resume';

  public uploader: FileUploader = new FileUploader({url: this.uploadUrl, itemAlias: 'resume'});
  constructor(private router: Router) {}

  ngOnInit(){
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         console.log('ImageUpload:uploaded: ', item, status, response);
     };
  }

  isHomePage() {
    if (this.router.url === '/' || this.router.url === '') {
      return true;
    }
    return false;
  }
  isEmployeePage(){
    if (this.router.url === '/employer') {
      return true;
    }
    return false;
  }
}
