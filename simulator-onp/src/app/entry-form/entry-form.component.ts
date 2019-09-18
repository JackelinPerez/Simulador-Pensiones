import { Component, OnInit } from '@angular/core';
//incluyendo formulario
import { FormBuilder} from '@angular/forms';
//incluyendo routher
import { Router } from '@angular/router';
//incluyendo servicio formulario
import { SimulatorService} from '../services/simulator.service'
//incluyendo clases
import { Form} from '../models/form';
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
  compare : Form = {
    contribution : '',
    contributionmounths: '',
    rate: '',
    withdrawal: '',
    lifeYears: '',
  }

  total: any = {
      contribution: 0,
      contributionMounths:0  
  }

  constructor(private formBuilder: FormBuilder, private simulatorService:SimulatorService,private router: Router) {
    this.checkoutForm = this.formBuilder.group(this.compare);
   }

  ngOnInit() {
  }
  
  onSubmit(customerData:any) {
    this.formInputs.push(customerData);
    this.total = this.formInputs.map((ele:Table)=>{
      return {
        contribution: parseInt(ele.contribution),
        contributionmounths: parseInt(ele.contributionmounths)
      }
    }).reduce((acum,eleR)=>{
      acum.contribution += eleR.contribution;
      acum.contributionMounths += eleR.contributionmounths;
      return acum;
    },{contribution: 0, contributionMounths:0});
  }

  calculate(){
    if(!this.formInputs){
      alert('Algun campo No ha llenado')
    }
    else {
      this.simulatorService.changeMenu(this.formInputs);
      this.router.navigateByUrl('/resultado');
      this.checkoutForm.reset();
    }
  }
}
