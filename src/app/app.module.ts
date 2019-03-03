import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees.component';
import { SubmittedEmployeesComponent } from './submitted-employees.component';

import { EmployeeService } from './employee.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true })
  ],
  declarations: [
    AppComponent,
    EmployeesComponent,
    SubmittedEmployeesComponent
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})

export class AppModule { }