import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//incluyendo servicio
import { SimulatorService} from '../../services/simulator.service';

//imcluyendo clases form
import { FormScreen1, FormScreen2} from '../../models/form';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.css']
})
export class Screen3Component implements OnInit {

  formScreen2: FormScreen2 = {
    contribution: '',
    contributionYears: ''
  }
  
  formScreen1: FormScreen1= {
    name: '',
    age: '',
    dream: ''
}

  constructor(
    private router: Router,
    private simulatorService:SimulatorService    
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm1.subscribe((result :FormScreen1)=>{
      this.formScreen1 = {... result};
    })

    this.simulatorService.currentForm2.subscribe((result :FormScreen2)=>{
      this.formScreen2 = {... result};
    }) 
  }
  onSubmit() {
    //condicionar de acuerdo al tiempo elegido por sus sueños
    this.router.navigateByUrl('/pantalla_4');
  }

}
