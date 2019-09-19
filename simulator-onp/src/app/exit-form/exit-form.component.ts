import { Component, OnInit } from '@angular/core';
import { SimulatorService} from '../services/simulator.service';

//incluyendo routher
import { Router } from '@angular/router';

//incluyendo clases
import {Status, StatusResolved, StatusResolvedString} from '../models/status';

@Component({
  selector: 'app-exit-form',
  templateUrl: './exit-form.component.html',
  styleUrls: ['./exit-form.component.css']
})
export class ExitFormComponent implements OnInit {

  statusResolved: StatusResolved = {
    disburse: 0,
    amountCollected: 0,
    monthlyPension: 0,
    monthlyPensionr:0,
    contribution:0,
    contributionmounths: 0,
    interest: 0
  };

  statusResolvedString: StatusResolvedString = {
    disburse: '',
    amountCollected: '',
    monthlyPension: '',
    monthlyPensionr:'',
    contribution:'',
    contributionmounths: '',
    interest: ''    
  };
  statusPensionsResult: Status;
  statusPensions: Status[] = [
    {message: 'Ayuda!',
    img: 'assets/img/cry.gif'},
    {message: 'Bien!',
    img: 'assets/img/good.gif'},
    {message: 'Provechito!',
    img: 'assets/img/winner.gif'},
  ];

  constructor(
    private simulatorService: SimulatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm.subscribe((result: StatusResolved)=>{
      if(!result.contribution) this.router.navigateByUrl('/formulario');
      else{
        let calculatePensionOk:StatusResolved = {...this.calculatePension(result)};
        this.statusPensionsResult = this.statusPension(calculatePensionOk.monthlyPension);
        this.statusResolvedString = this.convertionTostring(calculatePensionOk);
      }
      })
  }

  calculatePension(outputForm: StatusResolved){
    const rate = 3.5/1200;//tasa efectiva de 5% anual
    const withdrawal = 30/100;//30% porcentaje a retirar
    const lifeYears = 10*12;//10 años de pension
    this.statusResolved.contribution = outputForm.contribution;
    this.statusResolved.contributionmounths = outputForm.contributionmounths*12;
    this.statusResolved.amountCollected = (this.statusResolved.contribution*((Math.pow((1+(rate)),this.statusResolved.contributionmounths+1)-1)/(rate)-1));
    this.statusResolved.disburse = ((withdrawal)*this.statusResolved.amountCollected);
    this.statusResolved.monthlyPension = (((1-(withdrawal))*this.statusResolved.amountCollected)/(lifeYears));
    this.statusResolved.monthlyPensionr = (((1-(0))*this.statusResolved.amountCollected)/(lifeYears));
    this.statusResolved.interest = (this.statusResolved.amountCollected - this.statusResolved.contribution*this.statusResolved.contributionmounths);
    this.statusResolved.contributionmounths = outputForm.contributionmounths;
    this.statusResolved.contribution = outputForm.contribution + 121;
    return this.statusResolved;
  }
  convertionTostring(objNumber: StatusResolved){
    let objNumberAux: StatusResolved = {...objNumber};
    let statusOK:StatusResolvedString ={...this.statusResolvedString};
    Object.keys(objNumberAux).forEach(ele => {
      // statusOK[ele] = objNumberAux[ele].toLocaleString('de-PEN');
      statusOK[ele] = objNumberAux[ele].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});
    });
    return statusOK;
  }
  statusPension(totalAcum:number){
    let result:Status ={message:'', img:''};
    if(totalAcum<200) result = this.statusPensions[0];
    else if (totalAcum<400 && totalAcum>=200) result = this.statusPensions[1];
    else result = this.statusPensions[2];
    return result;
  }

  onSubmit() {
    this.router.navigateByUrl('/formulario');
  }  
}
