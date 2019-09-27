import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//incluyendo formulario
import { FormBuilder} from '@angular/forms';

//imcluyendo clases form
import { FormScreen1, FormScreen2} from '../../models/form';

//incluyendo servicio
import { SimulatorService} from '../../services/simulator.service';

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.css']
})
export class Screen2Component implements OnInit {

  dreamOutput: string = '';
  checkoutForm_: FormScreen2 = {
    contribution: '',
    contributionYears: ''
  };
  contributionYears: Object[] = [
    { value: 'N° '},
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
 ];
 disbursementYears_:number = 0;
  checkoutForm; 
  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private simulatorService:SimulatorService
  ){ 
  this.checkoutForm = this.formBuilder.group(this.checkoutForm_);
  }

  ngOnInit() {
    this.simulatorService.currentForm1.subscribe((result :FormScreen1)=>{
      this.dreamOutput = result.dream;
    })    
  }

  onSubmit(customerData:any) {
    this.simulatorService.changeScreen2({...customerData, contributionYears: this.disbursementYears_});
    this.router.navigateByUrl('/pantalla_3');
  }

  onChangeYearsDisbursement(newValue:any){
    this.disbursementYears_ = newValue;
  }  
}
