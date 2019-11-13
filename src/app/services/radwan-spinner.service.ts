import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadwanSpinnerService {
  public showSpinner = new Subject<boolean>()
  constructor() { }
  //show spinnner event
  show() {
    this.showSpinner.next(true);
  }
  //hide spinner event
  hide() {
    this.showSpinner.next(false);
  }
}
