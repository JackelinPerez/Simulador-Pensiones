import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { ExitFormComponent } from './exit-form/exit-form.component';

//incluyendo formulario
import { ReactiveFormsModule } from '@angular/forms';

//incluyendo routher
import { RouterModule, Routes } from '@angular/router';

//servicios
import {SimulatorService} from './services/simulator.service';
import { Screen1Component } from './entry-form/screen1/screen1.component';
import { Screen2Component } from './entry-form/screen2/screen2.component';
import { Screen3Component } from './exit-form/screen3/screen3.component';
import { Screen4Component } from './entry-form/screen4/screen4.component';
import { Screen5Component } from './exit-form/screen5/screen5.component';

const appRoutes: Routes = [
  {path:'resultado', component:ExitFormComponent},
  {path:'formulario', component:EntryFormComponent},
  {path:'pantalla_1', component:Screen1Component},
  {path:'pantalla_2', component:Screen2Component},
  {path:'pantalla_3', component:Screen3Component},
  {path:'pantalla_4', component:Screen4Component},
  {path:'pantalla_5', component:Screen5Component},
  {path:'', component:Screen1Component},
  { path: '',   redirectTo: '/pantalla_1', pathMatch: 'full' },
  // {path:'', component:EntryFormComponent},
  // { path: '',   redirectTo: '/formulario', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    EntryFormComponent,
    ExitFormComponent,
    Screen1Component,
    Screen2Component,
    Screen3Component,
    Screen4Component,
    Screen5Component,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    SimulatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
