import { Injectable } from '@angular/core';

//Observables
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  items = [];
  private items$ = new Subject<SimulatorService[]>();
  constructor() { }

  addItem(product:SimulatorService) {
    this.items.push(product);
    this.items$.next(this.items);
  }

  getItems() {
    return this.items;
  }  
}
