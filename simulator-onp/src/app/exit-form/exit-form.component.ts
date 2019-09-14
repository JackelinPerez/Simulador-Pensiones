import { Component, OnInit } from '@angular/core';
import { SimulatorService} from '../services/simulator.service';

@Component({
  selector: 'app-exit-form',
  templateUrl: './exit-form.component.html',
  styleUrls: ['./exit-form.component.css']
})
export class ExitFormComponent implements OnInit {

  itemss;
  constructor(
    private simulatorService: SimulatorService
  ) { }

  ngOnInit() {
    this.itemss = this.simulatorService.getItems();
    console.log('Meses aportados:'+Object.keys(this.itemss));
  }

}
