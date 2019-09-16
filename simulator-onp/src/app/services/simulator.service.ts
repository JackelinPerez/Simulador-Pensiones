import { Injectable } from '@angular/core';

//Observables
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  private formSave = new BehaviorSubject({});
  public currentForm = this.formSave.asObservable();

  constructor() {};

  changeMenu(value: any){
    this.formSave.next(value);
  }
}
