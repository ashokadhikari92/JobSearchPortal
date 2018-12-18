import { EventEmitter } from 'events';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loaderEvent$: EventEmitter;

  constructor() {
    this.loaderEvent$ = new EventEmitter();
  }

  public showLoader() {
    this.loaderEvent$.emit('start');
  }

  public stopLoader() {
    this.loaderEvent$.emit('stop');
  }
}
