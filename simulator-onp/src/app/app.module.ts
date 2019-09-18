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

const appRoutes: Routes = [
  {path:'resultado', component:ExitFormComponent},
  {path:'formulario', component:EntryFormComponent},
  {path:'', component:EntryFormComponent},
  { path: '',   redirectTo: '/formulario', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    EntryFormComponent,
    ExitFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SimulatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
