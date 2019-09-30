import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//imcluyendo clases form
import { FormExit, FormScreen1, FormScreen4} from '../../models/form';
import { StatusResolvedString, StatusResolved} from '../../models/status';

//incluyendo servicio
import { SimulatorService} from '../../services/simulator.service';

@Component({
  selector: 'app-screen5',
  templateUrl: './screen5.component.html',
  styleUrls: ['./screen5.component.css']
})
export class Screen5Component implements OnInit {

  dreamOutput: string = '';
  statusResolvedString: StatusResolvedString;
  statusResolved: StatusResolved;

  constructor(
    private router: Router,
    private simulatorService:SimulatorService    
  ) { }

  ngOnInit() {
    this.simulatorService.currentForm1.subscribe((result :FormScreen1)=>{
      this.simulatorService.currentForm3.subscribe((result3 :StatusResolved)=>{
        this.simulatorService.currentForm4.subscribe((result4 :FormScreen4)=>{
          this.dreamOutput = result.dream;
          if (result4.contributionMontly) {
            this.statusResolved = this.calculateFormExit(result4, {... result3});
            this.statusResolved.monthlyPensionr = this.simulatorService.monthlyPension(this.statusResolved.contributionFixed);                 
          }else{
            this.statusResolved = {...result3};
            this.statusResolved.disbursementAmountCollected = this.statusResolved.amountCollected;
            this.statusResolved.amountCollected = 0;
          }
          this.statusResolvedString = this.simulatorService.convertionTostring(this.statusResolved);
        }); 

      }); 
      
    })  
  }

  onSubmit(){
    this.router.navigateByUrl('/pantalla_1');    
  }

  calculateFormExit(result: FormScreen4, resultDream: StatusResolved){

    let statusResolved: StatusResolved ={... resultDream};
    statusResolved.disbursementAmountCollected = resultDream.amountCollected;
    statusResolved.contributionMontly = parseInt(result.contributionMontly);
    statusResolved.contributionYears = 20 - statusResolved.contributionYears; 
    statusResolved = this.simulatorService.amountFixedContribution(statusResolved, {contributionYears: statusResolved.disbursementYears});
    return this.simulatorService.calculatePension(statusResolved);
  }  
}
