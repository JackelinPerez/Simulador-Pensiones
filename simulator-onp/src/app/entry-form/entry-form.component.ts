import { Component, OnInit } from '@angular/core';
//incluyendo formulario
import { FormBuilder} from '@angular/forms';
//incluyendo routher
import { Router } from '@angular/router';
//incluyendo servicio formulario
import { SimulatorService} from '../services/simulator.service'
//incluyendo clases
import { Form, FormExit, FormExitString} from '../models/form';
import { TableNumber, TableString} from '../models/table';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  checkoutForm;
  disburse;
  monthlyPension;

  formInputsNumber: TableNumber []= [];
  formInputsString: TableString []= [];
  
  formExit: FormExit ={
    contribution: 0,
    contributionYears: 0,
    disbursementYears: 0
  }

  formExitTotal: FormExit ={
    contribution: 0,
    contributionYears: 0,
    disbursementYears: 0
  }

  formExitTotalString: FormExitString = {
    contribution: '',
    contributionYears: '',
    disbursementYears: ''
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
     { value: 'N° '},
     { value: 5 },
     { value: 10 },
     { value: 15 },
     { value: 20 }
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
      this.simulatorService.changeMenu(customerData_);
      this.router.navigateByUrl('/resultado');
      this.checkoutForm.reset();
    }
  }

  onChangeYears(newValue:any){
    this.formExit.contributionYears = parseInt(newValue);
    console.log('Periodos de aportes: '+this.formExit.contributionYears);
    
  }

  onChangeYearsDisbursement(newValue:any){
    this.formExit.disbursementYears = parseInt(newValue);
    console.log('Periodo a desemmbolsar: '+this.formExit.disbursementYears);
    
  }  

  onSubmit(customerData:any) {

    this.contributionSee.total = customerData.contribution;
    this.contributionSee.fixed = 121;
    this.contributionSee.variable = customerData.contribution -121;
    this.formExit.contribution = this.contributionSee.variable;

    //pruebita:
    this.simulatorService.monthlyPension(this.contributionSee.total*0.5);
    

    this.formInputsNumber.push({
      contributionMontly: this.formExit.contribution+121,
      ... this.formExit,
      interestGained: this.simulatorService.calculatePension(this.formExit).interest,
      missingYears: 20- this.formExit.contributionYears,
      amountCollected: this.simulatorService.calculatePension(this.formExit).amountCollected
    });


    this.formInputsString.push({
      contributionMontly: (this.formExit.contribution+121).toString(),
      contribution: (this.formExit.contribution).toString(),
      contributionYears: (this.formExit.contributionYears).toString(),
      disbursementYears: (this.formExit.disbursementYears).toString(),
      interestGained: this.simulatorService.convertionTostring(this.simulatorService.calculatePension(this.formExit)).interest,
      missingYears: (20- this.formExit.contributionYears).toString(),
      amountCollected: this.simulatorService.convertionTostring(this.simulatorService.calculatePension(this.formExit)).amountCollected
    });    

    this.formExitTotal = this.formInputsNumber.reduce((acum,eleR)=>{
      acum.contribution += eleR.amountCollected;
      acum.contributionYears += eleR.contributionYears;
      acum.disbursementYears += eleR.disbursementYears;
      return acum;
    },{contribution: 0, contributionYears:0, disbursementYears:0});

    this.formExitTotalString = {
      contribution: this.simulatorService.convertionTostring(this.formExitTotal).contribution,
      contributionYears: this.simulatorService.convertionTostring(this.formExitTotal).contributionYears,
      disbursementYears: this.simulatorService.convertionTostring(this.formExitTotal).disbursementYears
    }
  }
}
