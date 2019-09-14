import { Component, OnInit } from '@angular/core';
//incluyendo formulario
import { FormBuilder} from '@angular/forms';
//incluyendo routher
import { RouterModule, Router } from '@angular/router';
//incluyendo servicio formulario
import { SimulatorService} from '../services/simulator.service'

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  checkoutForm;
  disburse;
  monthlyPension;

  constructor(private formBuilder: FormBuilder, private simulatorService:SimulatorService,public router: Router) {
    this.checkoutForm = this.formBuilder.group({
      contribution: '',
      contributionmounths: '',
      rate:'',
      withdrawal:'',
      lifeYears:''
    });
   }

  ngOnInit() {
  }
  
  onSubmit(customerData) {
    console.log('cuota mensual: '+ customerData.contribution);
    this.simulatorService.addItem(customerData);
    this.router.navigateByUrl('/resultado');
  }

  //Almacenando Info de formulario
  // onSubmit(customerData) {
  //   this.router.navigateByUrl('/resultado');

  //   const contribution = parseFloat(customerData.contribution);
  //   const contributionmounths = parseFloat(customerData.contributionmounths);
  //   const rate = parseFloat(customerData.rate)/12;
  //   const withdrawal = parseFloat (customerData.withdrawal);
  //   const lifeYears = parseFloat(customerData.lifeYears);
  //   this.disburse = ((withdrawal/100)*contribution*((Math.pow((1+(rate/100)),contributionmounths+1)-1)/(rate/100)-1)).toFixed(2);
  //   this.monthlyPension = (((1-(withdrawal/100))*contribution*((Math.pow((1+(rate/100)),contributionmounths+1)-1)/(rate/100)-1))/(lifeYears*12)).toFixed(2);
  // }


}
