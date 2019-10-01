import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//incluyendo formulario
import { FormBuilder} from '@angular/forms';

//imcluyendo clases form
import { FormScreen1} from '../../models/form';

//incluyendo servicio
import { SimulatorService} from '../../services/simulator.service';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})
export class Screen1Component implements OnInit {
  
  checkoutForm_: FormScreen1 = {
    name: '',
    age: '',
    dream: '' 
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
  }

  onSubmit(customerData:any) {
    
    if (customerData.dream.indexOf(' ')!== -1) {
      alert('Por favor describir tu meta en Una palabra')
    }
    else{
      this.simulatorService.changeScreen1({...customerData});
      this.router.navigateByUrl('/pantalla_2');
    }
  }

}
