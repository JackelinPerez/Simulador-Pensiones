import { Injectable } from '@angular/core';

//Observables
import { BehaviorSubject} from 'rxjs';

//incluyendo clases
import {Status, StatusResolved, StatusResolvedString} from '../models/status';


@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  private formSave = new BehaviorSubject({});
  public currentForm = this.formSave.asObservable();

  constructor() {};

  statusResolvedString: StatusResolvedString = {
    disburse: '',
    amountCollected: '',
    amountVariable: '',
    monthlyPension: '',
    monthlyPensionr:'',
    contribution:'',
    contributionTotal:'',
    contributionmounths: '',
    contributionYears: '',
    interest: ''    
  };

  changeMenu(value: any){
    this.formSave.next(value);
  }

  calculatePension(outputForm: any){
    const rate = 3.5/1200;//tasa efectiva de 5% anual
    const withdrawal = 30/100;//30% porcentaje a retirar
    const lifeYears = 10*12;//10 años de pension
    let statusResolved: StatusResolved = {
      disburse: 0,
      amountCollected: 0,
      amountVariable: 0,
      monthlyPension: 0,
      monthlyPensionr:0,
      contribution:0,
      contributionTotal:0,
      contributionmounths: 0,
      contributionYears: 0,
      interest: 0
    };

    statusResolved.contribution = outputForm.contribution;
    statusResolved.contributionYears = outputForm.contributionYears;
    statusResolved.contributionmounths = outputForm.contributionYears*12;
    statusResolved.amountCollected = (statusResolved.contribution*((Math.pow((1+(rate)),statusResolved.contributionmounths+1)-1)/(rate)-1));
    statusResolved.disburse = ((withdrawal)*statusResolved.amountCollected);
    statusResolved.monthlyPension = (((1-(withdrawal))*statusResolved.amountCollected)/(lifeYears));
    statusResolved.monthlyPensionr = (((1-(0))*statusResolved.amountCollected)/(lifeYears));
    statusResolved.interest = (statusResolved.amountCollected - statusResolved.contribution*statusResolved.contributionmounths);
    statusResolved.contributionTotal = outputForm.contribution + 121;
    statusResolved.amountVariable = outputForm.contribution;
    return statusResolved;
  }
  
  yearsForPensionar(years:string){
    return 20-parseInt(years);
  }

  convertionTostring(objNumber: any){
    let objNumberAux: StatusResolved = {...objNumber};
    let statusOK:StatusResolvedString = {...this.statusResolvedString};
    Object.keys(objNumberAux).forEach(ele => {
      // statusOK[ele] = objNumberAux[ele].toLocaleString('de-PEN');
      statusOK[ele] = objNumberAux[ele].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});
    });
    return statusOK;
  }
}
