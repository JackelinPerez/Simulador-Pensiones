import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//incluyendo servicio
import { SimulatorService} from '../../services/simulator.service';

//imcluyendo clases form
import { FormExit, FormExitString, FormScreen1, FormScreen2} from '../../models/form';
import { StatusResolvedString, StatusResolved} from '../../models/status';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.css']
})
export class Screen3Component implements OnInit {

  formScreen2: FormScreen2 = {
    contributionMontly: '',
    contributionYears: ''
  }
  
  formScreen1: FormScreen1= {
    name: '',
    age: '',
    dream: ''
  }

  statusResolvedString: StatusResolvedString;
  statusResolved: StatusResolved;

  constructor(
    private router: Router,
    private simulatorService:SimulatorService    
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm1.subscribe((result1 :FormScreen1)=>{
      this.simulatorService.currentForm2.subscribe((result2 :FormScreen2)=>{
        this.formScreen1 = {... result1};
        this.formScreen2 = {... result2};
        this.statusResolved = this.calculateFormExit(result2);
        this.statusResolvedString = this.simulatorService.convertionTostring(this.statusResolved);
        this.simulatorService.changeScreen3({...this.statusResolved});
        // console.log('-----------------------------------------');
        // Object.keys(this.statusResolvedString).forEach(ele => {
        //   console.log(ele +': '+this.statusResolvedString[ele]);
        // });
      })

    })

  }
  onSubmit() {
    //condicionar de acuerdo al tiempo elegido por sus sueños
    if (this.statusResolved.contributionYears< 20) {
      this.router.navigateByUrl('/pantalla_4');
    }else{
      this.router.navigateByUrl('/pantalla_5');
    }
    // calcular monto a deseembolsar
  }

  calculateFormExit(result: FormScreen2){
    let formExit: FormExit ={
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

    formExit.contributionYears = parseInt(result.contributionYears);
    formExit.contributionMontly = parseInt(result.contributionMontly);
    formExit.disbursementYears = this.simulatorService.yearsForPensionar(result.contributionYears);

    formExit = this.simulatorService.amountFixedContribution(formExit, {contributionYears:0});
    return this.simulatorService.calculatePension(formExit);
  }

}
