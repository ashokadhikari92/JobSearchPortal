import { FilterService } from '../services/filter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = '';
  location = '';

  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }

  filterJob(){
    const filters ={
      title: this.title,
      location: this.location
    }
    this.filterService.filterJob(filters);
  }
}
