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
  alertAmounth: string = '';
  checkoutForm_: FormScreen2 = {
    contributionMontly: '',
    contributionYears: ''
  };
  contributionYears: any[] = [
    { value: 'N° '},
    { value: 3 },
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
 ];
 disbursementYears_:any = 'N° ';
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
    if (parseInt(customerData.contributionMontly)>=200 && this.disbursementYears_ !== 'N° ') {
      this.simulatorService.changeScreen2({...customerData, contributionYears: this.disbursementYears_});
      this.router.navigateByUrl('/pantalla_3');
    } else if(this.disbursementYears_ === 'N° '){
      alert('Por favor introducir periodo de desembolso');
    } else{
      alert('Por favor introducir un monto minimo de S/200.00');
    }

  }

  onChangeYearsDisbursement(newValue:any){
    this.disbursementYears_ = newValue;
  }  
}
