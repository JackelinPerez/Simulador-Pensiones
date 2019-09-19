import { Component, OnInit } from '@angular/core';
//incluyendo formulario
import { FormBuilder} from '@angular/forms';
//incluyendo routher
import { Router } from '@angular/router';
//incluyendo servicio formulario
import { SimulatorService} from '../services/simulator.service'
//incluyendo clases
import { Form, FormExit} from '../models/form';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  checkoutForm;
  disburse;
  monthlyPension;
  formExit: FormExit ={
    contribution: 0,
    contributionmounths: 0,   
}
  contributionSee = {
    total:0,
    fixed: 0,
    variable: 0
  }
  compare : Form = {
    contribution : '',
    contributionmounths: '',
    rate: '',
    withdrawal: '',
    lifeYears: '',
  }

  contributionYears: Object[] = [
     { name: 'predet',
       value: 'N° ' },
     { name: 'small',
       value: 5 },
     { name: 'medium',
       value: 10 },
     { name: 'large',
       value: 15 },
     { name: 'extraLarge',
       value: 20 }
  ];
  constructor(private formBuilder: FormBuilder, private simulatorService:SimulatorService,private router: Router) {
    this.checkoutForm = this.formBuilder.group(this.compare);
   }

  ngOnInit() { 
  }

  formSave(customerData_:any){
    if(customerData_ == this.compare){
      alert('Algun campo No ha llenado')
    }
    else {
      this.simulatorService.changeMenu(this.formExit);
      this.router.navigateByUrl('/resultado');
      this.checkoutForm.reset();
    }
  }

  onChange(newValue:any){
    // console.log('valor: '+newValue);
    this.formExit.contributionmounths = newValue;
  }

  onSubmit(customerData:any) {
    this.contributionSee.total = customerData.contribution;
    this.contributionSee.fixed = 121;
    this.contributionSee.variable = customerData.contribution -121;
    this.formExit.contribution = this.contributionSee.variable;
  }
}
