import { Component, OnInit } from '@angular/core';
//incluyendo formulario
import { FormBuilder} from '@angular/forms';
//incluyendo routher
import { Router } from '@angular/router';
//incluyendo servicio formulario
import { SimulatorService} from '../services/simulator.service'
//incluyendo clases
import { Form, FormExit} from '../models/form';
import { Table} from '../models/table';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  checkoutForm;
  disburse;
  monthlyPension;

  formInputs: Table []= [];
  
  formExit: FormExit ={
    contribution: 0,
    contributionYears: 0,   
}
  contributionSee = {
    total:0,
    fixed: 0,
    variable: 0
  }
  compare : Form = {
    contribution : '',
    contributionYears: '',
    rate: '',
    withdrawal: '',
    lifeYears: '',
    select:'N° '
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
    this.formExit.contributionYears = newValue;
  }

  onSubmit(customerData:any) {

    this.contributionSee.total = customerData.contribution;
    this.contributionSee.fixed = 121;
    this.contributionSee.variable = customerData.contribution -121;
    this.formExit.contribution = this.contributionSee.variable;

    this.formInputs.push({
      // ... this.formExit,
      contribution: this.formExit.contribution,
      contributionYears: this.formExit.contributionYears,
      missingYears: 20- this.formExit.contributionYears
    });

    // this.formExit = this.formInputs.reduce((acum,eleR)=>{
    //   acum.contribution += eleR.contribution;
    //   acum.contributionYears += eleR.contributionYears;
    //   return acum;
    // },{contribution: 0, contributionYears:0});

    // this.checkoutForm.reset();


  }
}
