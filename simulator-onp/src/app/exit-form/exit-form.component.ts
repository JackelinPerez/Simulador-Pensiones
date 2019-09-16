import { Component, OnInit } from '@angular/core';
import { SimulatorService} from '../services/simulator.service';

//incluyendo routher
import { Router, Resolve } from '@angular/router';

//incluyendo clases
import {Status, StatusResolved} from '../models/status';

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
    contribution:0,
    contributionmounths: 0
  };
  statusPensionsResult: Status;
  statusPensions: Status[] = [
    {message: 'Ayuda!',
    img: 'assets/img/cry.gif'},
    {message: 'Sobreviviras!',
    img: 'assets/img/good.gif'},
    {message: 'Provechito!',
    img: 'assets/img/winner.gif'},
  ];

  constructor(
    private simulatorService: SimulatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm.subscribe((result: any)=>{
    this.statusResolved.contribution = parseFloat(result.contribution);
    this.statusResolved.contributionmounths = parseFloat(result.contributionmounths);
    const rate = 3.5/1200;//tasa efectiva de 5% anual
    const withdrawal = 50/100;//50% porcentaje a retirar
    const lifeYears = 10*12;//10 años de aporte
    this.statusResolved.amountCollected = parseFloat((this.statusResolved.contribution*((Math.pow((1+(rate)),this.statusResolved.contributionmounths+1)-1)/(rate)-1)).toFixed(2));
    this.statusResolved.disburse = parseFloat(((withdrawal)*this.statusResolved.amountCollected).toFixed(2));
    this.statusResolved.monthlyPension = parseFloat((((1-(withdrawal))*this.statusResolved.contribution*((Math.pow((1+(rate)),this.statusResolved.contributionmounths+1)-1)/(rate)-1))/(lifeYears)).toFixed(2));
    this.statusPensionsResult = this.statusPension(this.statusResolved.monthlyPension);
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
