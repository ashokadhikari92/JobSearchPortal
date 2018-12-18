import { EventEmitter } from 'events';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterEvent$: EventEmitter;

  constructor() {
    this.filterEvent$ = new EventEmitter();
  }

  public filterJob(filter) {
    this.filterEvent$.emit('filter', filter);
  }
}
