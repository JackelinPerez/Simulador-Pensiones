import { Injectable } from '@angular/core';

//Observables
import { BehaviorSubject} from 'rxjs';

//incluyendo clases
import {Status, StatusResolved, StatusResolvedString} from '../models/status';

//incluyendo clases
import { FormExit} from '../models/form';

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
    contributionFixed:'',
    contributionMontly:'',
    contributionmounths: '',
    contributionYears: '',
    disbursementYears: '',
    interest: '',
    disbursementAmountCollected: ''
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
      contributionFixed: 0,
      contributionMontly:0,
      contributionmounths: 0,
      contributionYears: 0,
      disbursementYears: 0,
      interest: 0,
      disbursementAmountCollected: 0
    };

    statusResolved.contribution = outputForm.contribution;
    statusResolved.contributionYears = outputForm.contributionYears;
    statusResolved.contributionmounths = outputForm.contributionYears*12;
    statusResolved.amountCollected = (statusResolved.contribution*((Math.pow((1+(rate)),statusResolved.contributionmounths+1)-1)/(rate)-1));
    statusResolved.disburse = ((withdrawal)*statusResolved.amountCollected);
    statusResolved.monthlyPension = (((1-(withdrawal))*statusResolved.amountCollected)/(lifeYears));
    statusResolved.monthlyPensionr = (((1-(0))*statusResolved.amountCollected)/(lifeYears));
    statusResolved.interest = (statusResolved.amountCollected - statusResolved.contribution*statusResolved.contributionmounths);
    statusResolved.contributionMontly = outputForm.contributionMontly;
    statusResolved.amountVariable = outputForm.contribution;
    statusResolved.disbursementYears = outputForm.disbursementYears;
    statusResolved.contributionFixed = outputForm.contributionFixed;
    return statusResolved;
  }
  
  yearsForPensionar(years:string){
    return 20-parseInt(years);
  }

  amountFixedContribution(formInputsRaw: any, formInputsTotal: any){
    let formExit: FormExit ={
      contributionMontly:0,
      contribution: 0,
      contributionFixed: 0,
      contributionYears: 0,
      disbursementYears: 0,
      monthlyPensionr:0,
      amountCollected:0,
      disbursementAmountCollected: 0
    }

    formExit.contributionMontly = formInputsRaw.contributionMontly;
    formExit.contributionYears = formInputsRaw.contributionYears;
    formExit.disbursementYears = formInputsRaw.disbursementYears;
    formExit.disbursementAmountCollected = formInputsRaw.disbursementAmountCollected;

    if((formInputsTotal.contributionYears < formInputsRaw.disbursementYears) || !formInputsTotal.contributionYears ){
    formExit.contribution = formInputsRaw.contributionMontly - 121;
      formExit.contributionFixed = 121;
    }
    else{
      formExit.contribution = formInputsRaw.contributionMontly*0.29;
      formExit.contributionFixed = formInputsRaw.contributionMontly*0.61; 
    }

    return formExit;
  }
  
  convertionTostring(objNumber: any){
    let objNumberAux: StatusResolved = {...objNumber};
    let statusOK:StatusResolvedString = {...this.statusResolvedString};
    Object.keys(objNumberAux).forEach(ele => {
      statusOK[ele] = objNumberAux[ele].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});
    });
    return statusOK;
  }

  monthlyPension(fixedPension: number){
    let promPension:number = 0;
    const contributionPension = [
      { pensionValue: 500.00},
      { pensionValue: 565.50},
      { pensionValue: 631.00},
      { pensionValue: 696.50},
      { pensionValue: 762.00},
      { pensionValue: 827.50},
      { pensionValue: 893.00}
    ]      
    switch (true) {
      case ((121 <= fixedPension) && (fixedPension <155)):
        promPension = contributionPension[0].pensionValue;
        break;
      case ((155 <= fixedPension) && (fixedPension <189)):
        promPension = contributionPension[1].pensionValue;
        break;  
      case ((189 <= fixedPension) && (fixedPension <223)):
        promPension = contributionPension[2].pensionValue;
        break;
      case ((223 <= fixedPension) && (fixedPension <257)):
        promPension = contributionPension[3].pensionValue;        
        break;
      case ((257 <= fixedPension) && (fixedPension <291)):
        promPension = contributionPension[4].pensionValue;   
        break;
      case ((291 <= fixedPension) && (fixedPension <325)):
        promPension = contributionPension[5].pensionValue;               
        break;
      case (325 <= fixedPension):
        promPension = contributionPension[6].pensionValue;               
        break;             
      default:
        promPension = 0;           
        break;
    }
    
    return promPension;
  }

}
