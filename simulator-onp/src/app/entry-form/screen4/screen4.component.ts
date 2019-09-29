import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//incluyendo formulario
import { FormBuilder} from '@angular/forms';

//imcluyendo clases form
import { FormScreen1, FormScreen4} from '../../models/form';

//incluyendo servicio
import { SimulatorService} from '../../services/simulator.service';


@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.component.html',
  styleUrls: ['./screen4.component.css']
})
export class Screen4Component implements OnInit {

  dreamOutput: string = '';
  checkoutForm_: FormScreen4 = {
    contributionYears: ''
  };

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
    this.simulatorService.changeMenu({...customerData});
    this.router.navigateByUrl('/pantalla_5');
  }  
}
