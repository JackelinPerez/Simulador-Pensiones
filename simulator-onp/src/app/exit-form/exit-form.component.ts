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

  yearsForPensionar: number = 0;

  constructor(
    private simulatorService: SimulatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm.subscribe((result: StatusResolved)=>{
      if(result.contribution < 0) this.router.navigateByUrl('/formulario');
      else{
        let calculatePensionOk:StatusResolved = {...this.simulatorService.calculatePension(result)};
        this.statusPensionsResult = this.statusPension(calculatePensionOk.monthlyPension);
        this.statusResolvedString = this.simulatorService.convertionTostring(calculatePensionOk);
        this.yearsForPensionar = this.simulatorService.yearsForPensionar(this.statusResolvedString.contributionYears);
      }
      })
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
