import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//imcluyendo clases form
import { FormScreen1} from '../../models/form';

//incluyendo servicio
import { SimulatorService} from '../../services/simulator.service';

@Component({
  selector: 'app-screen5',
  templateUrl: './screen5.component.html',
  styleUrls: ['./screen5.component.css']
})
export class Screen5Component implements OnInit {

  dreamOutput: string = '';
  constructor(
    private router: Router,
    private simulatorService:SimulatorService    
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm1.subscribe((result :FormScreen1)=>{
      this.dreamOutput = result.dream;
    })  
  }

  onSubmit(){
    this.router.navigateByUrl('/pantalla_1');    
  }
}
