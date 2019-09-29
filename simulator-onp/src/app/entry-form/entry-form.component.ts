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
  
  amountCollected = [];

  contributionYears__: number = 0;
  disbursementYears__: number = 0;


  formExit: FormExit ={
    contributionMontly: 0,
    contribution: 0,
    contributionFixed: 0,
    contributionYears: 0,
    disbursementYears: 0,
    monthlyPensionr: 0,
    amountCollected: 0,
    disbursementAmountCollected: 0,
    pensionerForPensionr: 0,
  }

  formExitExit: FormExit ={
    contributionMontly: 0,
    contribution: 0,
    contributionFixed: 0,
    contributionYears: 0,
    disbursementYears: 0,
    monthlyPensionr: 0,
    amountCollected: 0,
    disbursementAmountCollected: 0,
    pensionerForPensionr: 1
  }  

  formExitTotal: FormExit ={
    contributionMontly: 0,
    contribution: 0,
    contributionFixed: 0,
    contributionYears: 0,
    disbursementYears: 0,
    monthlyPensionr: 0,
    amountCollected: 0,
    disbursementAmountCollected: 0,
    pensionerForPensionr: 0
  }

  formExitTotalString: FormExitString = {
    contributionMontly: '',
    contribution: '',
    contributionFixed: '',
    contributionYears: '',
    disbursementYears: '',
    monthlyPensionr: '',
    amountCollected: '',
    disbursementAmountCollected: '',
    pensionerForPensionr:''
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
     { value: 20 },
  ];

  contributionYears___: Object[] = [
    { value: 'N° '},
    { value: 5 },
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
      this.simulatorService.changeMenu({...customerData_});
      this.router.navigateByUrl('/resultado');
      this.checkoutForm.reset();
    }
  }

  onChangeYears(newValue:any){
    this.contributionYears__ = parseInt(newValue);
  }

  onChangeYearsDisbursement(newValue:any){
    this.disbursementYears__ = parseInt(newValue);
  }  

  onSubmit(customerData:any) {

    this.formExit = this.simulatorService.amountFixedContribution({... this.formExit,
    contributionMontly: customerData.contribution, contributionYears: this.contributionYears__,
    disbursementYears: this.disbursementYears__}, this.formExitTotal);

    this.formExit.monthlyPensionr = this.simulatorService.monthlyPension(this.formExit.contributionFixed);
    this.formExit.amountCollected = this.simulatorService.calculatePension(this.formExit).amountCollected;

    this.formInputsNumber.push({... this.formExit, interestGained: this.simulatorService.calculatePension(this.formExit).interest,
    missingYears: 20- this.contributionYears__,});

    this.formInputsString.push({
      contributionMontly: (this.formExit.contributionMontly).toString(),
      contributionFixed: 0,
      contribution: this.simulatorService.convertionTostring(this.simulatorService.calculatePension(this.formExit)).contribution,
      contributionYears: (this.contributionYears__).toString(),
      disbursementYears: (this.disbursementYears__).toString(),
      interestGained: this.simulatorService.convertionTostring(this.simulatorService.calculatePension(this.formExit)).interest,
      missingYears: (20- this.contributionYears__).toString(),
      amountCollected: this.simulatorService.convertionTostring(this.simulatorService.calculatePension(this.formExit)).amountCollected,
      monthlyPensionr: this.formExit.monthlyPensionr.toString(),
      disbursementAmountCollected : this.formExit.disbursementAmountCollected.toString(),
      pensionerForPensionr: this.formExit.pensionerForPensionr.toString()
    });    

    this.formExitTotal = this.formInputsNumber.reduce((acum,eleR)=>{
      acum.contributionMontly += eleR.contributionMontly;
      acum.contribution += eleR.amountCollected;
      acum.contributionFixed += eleR.contributionFixed;
      acum.contributionYears += eleR.contributionYears;
      acum.disbursementYears += eleR.disbursementYears;
      acum.monthlyPensionr += eleR.monthlyPensionr;
      acum.amountCollected += eleR.amountCollected;
      acum.disbursementAmountCollected += eleR.disbursementAmountCollected;
      acum.pensionerForPensionr += eleR.pensionerForPensionr;
      return acum;
    },{contributionMontly:0, contribution: 0, contributionFixed:0, contributionYears:0, disbursementYears:0, monthlyPensionr:0, amountCollected:0, disbursementAmountCollected:0, pensionerForPensionr:0});

    //salida
    this.formExit.pensionerForPensionr = 20 - this.formExitTotal.contributionYears;

    this.formExitExit = this.simulatorService.saveExitdisbursement(this.formExit,this.formExitTotal,this.amountCollected);

    console.log('Te falta por pensionar: '+this.formExitExit.pensionerForPensionr);
    
    this.formExitTotalString = {
      contributionMontly: this.simulatorService.convertionTostring(this.formExitTotal).contributionMontly,
      contribution: this.simulatorService.convertionTostring(this.formExitTotal).contribution,
      contributionFixed: this.simulatorService.convertionTostring(this.formExitTotal).contributionFixed,
      contributionYears: this.simulatorService.convertionTostring(this.formExitTotal).contributionYears,
      disbursementYears: this.simulatorService.convertionTostring(this.formExitTotal).disbursementYears,
      monthlyPensionr: this.simulatorService.convertionTostring(this.formExitTotal).monthlyPensionr,
      amountCollected: this.simulatorService.convertionTostring(this.formExitTotal).amountCollected,
      disbursementAmountCollected: this.simulatorService.convertionTostring(this.formExitTotal).disbursementAmountCollected,
      pensionerForPensionr: this.simulatorService.convertionTostring(this.formExitTotal).pensionerForPensionr,
    }
  }
}
