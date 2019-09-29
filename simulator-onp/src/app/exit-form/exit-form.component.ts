import { Component, OnInit } from '@angular/core';
import { SimulatorService} from '../services/simulator.service';

//incluyendo routher
import { Router } from '@angular/router';

//incluyendo clases
import { FormExit,FormExitString } from '../models/form';

@Component({
  selector: 'app-exit-form',
  templateUrl: './exit-form.component.html',
  styleUrls: ['./exit-form.component.css']
})
export class ExitFormComponent implements OnInit {

  statusResolvedString: FormExitString = {
    contributionMontly: '',
    contribution: '',
    contributionFixed: '',
    contributionYears: '',
    disbursementYears: '',
    monthlyPensionr: '',
    amountCollected: '',
    disbursementAmountCollected: '',
    pensionerForPensionr: ''
  }

  constructor(
    private simulatorService: SimulatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm.subscribe((result: FormExit)=>{
      this.statusResolvedString = this.simulatorService.convertionTostring({...result});
      })
  }

  onSubmit() {
    this.router.navigateByUrl('/formulario');
  }  
}
