import { Component, OnInit } from '@angular/core';
import { SimulatorService} from '../services/simulator.service';

//incluyendo routher
import { Router, Resolve } from '@angular/router';

//incluyendo clases
import {Status} from '../models/status';

@Component({
  selector: 'app-exit-form',
  templateUrl: './exit-form.component.html',
  styleUrls: ['./exit-form.component.css']
})
export class ExitFormComponent implements OnInit {

  disburse: any = 0;
  monthlyPension: any = 0;
  statusPensions: Status[] = [
    {contribution: 100,
    img: 'assets/img/sad.png'},
    {contribution: 300,
    img: 'assets/img/ok.png'},
    {contribution: 600,
    img: 'assets/img/winner.png'},
  ];

  statusPensionsResult: Status;

  constructor(
    private simulatorService: SimulatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm.subscribe((result: any)=>{
    const contribution = parseFloat(result.contribution);
    const contributionmounths = parseFloat(result.contributionmounths);
    const rate = parseFloat(result.rate)/12;
    const withdrawal = parseFloat (result.withdrawal);
    const lifeYears = parseFloat(result.lifeYears);
    this.disburse = ((withdrawal/100)*contribution*((Math.pow((1+(rate/100)),contributionmounths+1)-1)/(rate/100)-1)).toFixed(2);
    this.monthlyPension = (((1-(withdrawal/100))*contribution*((Math.pow((1+(rate/100)),contributionmounths+1)-1)/(rate/100)-1))/(lifeYears*12)).toFixed(2);
    this.statusPensionsResult = this.statusPension(contribution);
    })
  }

  statusPension(contribution:any){
    let result:Status ={contribution:0, img:''};
    if(contribution<250) result = this.statusPensions[0];
    else if (contribution<600 && contribution>=250) result = this.statusPensions[1];
    else result = this.statusPensions[2];
    return result;
  }
  onSubmit() {
    this.router.navigateByUrl('/formulario');
  }  
}
