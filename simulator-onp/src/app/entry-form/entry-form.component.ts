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
  
  contributionYears__: number = 0;
  disbursementYears__: number = 0;

  formExit: FormExit ={
    contributionMontly: 0,
    contribution: 0,
    contributionFixed: 0,
    contributionYears: 0,
    disbursementYears: 0
  }

  formExitTotal: FormExit ={
    contributionMontly: 0,
    contribution: 0,
    contributionFixed: 0,
    contributionYears: 0,
    disbursementYears: 0
  }

  formExitTotalString: FormExitString = {
    contributionMontly: '',
    contribution: '',
    contributionFixed: '',
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

  contributionYears_: Object[] = [
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
    // this.formExit.contributionYears = parseInt(newValue);
    this.contributionYears__ = parseInt(newValue);
    console.log('Periodos de aportes: '+this.contributionYears__);
    
  }

  onChangeYearsDisbursement(newValue:any){
    // this.formExit.disbursementYears = parseInt(newValue);
    this.disbursementYears__ = parseInt(newValue);
    console.log('Periodo a desemmbolsar: '+this.disbursementYears__);
    
  }  

  onSubmit(customerData:any) {

    // this.contributionSee.total = customerData.contribution;
    // this.contributionSee.fixed = 121;
    // this.contributionSee.variable = customerData.contribution -121;
    // this.formExit.contribution = this.contributionSee.variable;

    //pruebita
    // let formExit_ = this.simulatorService.amountFixedContribution(
    //   {contributionMontly: customerData.contribution ,contribution: 0, contributionFixed: 0,
    //    contributionYears: this.formExit.contributionYears, disbursementYears: this.formExit.disbursementYears},
    //   {contributionMontly: 458, contribution: 0, contributionFixed: 0, contributionYears: 16, disbursementYears: 0 });

    this.formExit = this.simulatorService.amountFixedContribution(
      {contributionMontly: customerData.contribution ,contribution: 0, contributionFixed: 0,
       contributionYears: this.contributionYears__, disbursementYears: this.disbursementYears__},
      this.formExitTotal);

      console.log('-----------------------------------------');
      Object.keys(this.formExit).forEach(ele => {
        console.log(ele +': '+this.formExit[ele]);
      });

    
    this.simulatorService.monthlyPension(this.formExit.contributionFixed);

    this.formInputsNumber.push({
      ... this.formExit,
      interestGained: this.simulatorService.calculatePension(this.formExit).interest,
      missingYears: 20- this.contributionYears__,
      amountCollected: this.simulatorService.calculatePension(this.formExit).amountCollected
    });


    this.formInputsString.push({
      contributionMontly: (this.formExit.contributionMontly).toString(),
      contributionFixed: 0,
      contribution: (this.formExit.contribution).toString(),
      contributionYears: (this.contributionYears__).toString(),
      disbursementYears: (this.disbursementYears__).toString(),
      interestGained: this.simulatorService.convertionTostring(this.simulatorService.calculatePension(this.formExit)).interest,
      missingYears: (20- this.contributionYears__).toString(),
      amountCollected: this.simulatorService.convertionTostring(this.simulatorService.calculatePension(this.formExit)).amountCollected
    });    

    this.formExitTotal = this.formInputsNumber.reduce((acum,eleR)=>{
      acum.contributionMontly += eleR.contributionMontly;
      acum.contribution += eleR.amountCollected;
      acum.contributionFixed += eleR.contributionFixed;
      acum.contributionYears += eleR.contributionYears;
      acum.disbursementYears += eleR.disbursementYears;
      return acum;
    },{contributionMontly:0, contribution: 0, contributionFixed:0, contributionYears:0, disbursementYears:0});

    this.formExitTotalString = {
      contributionMontly: this.simulatorService.convertionTostring(this.formExitTotal).contributionMontly,
      contribution: this.simulatorService.convertionTostring(this.formExitTotal).contribution,
      contributionFixed: this.simulatorService.convertionTostring(this.formExitTotal).contributionFixed,
      contributionYears: this.simulatorService.convertionTostring(this.formExitTotal).contributionYears,
      disbursementYears: this.simulatorService.convertionTostring(this.formExitTotal).disbursementYears
    }
  }
}
