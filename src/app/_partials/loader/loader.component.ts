import { LoaderService } from './../services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  private loading = false;

  constructor(loderService: LoaderService) {
    loderService.loaderEvent$.on('start', () => {
      console.log('Loader started.');
      this.loading = true;
    });

    loderService.loaderEvent$.on('stop', () => {
      console.log('Loader stoped.')
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
