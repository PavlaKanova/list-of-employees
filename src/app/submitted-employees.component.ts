import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'my-submitted-employees',
  templateUrl: './submitted-employees.component.html'
})

export class SubmittedEmployeesComponent implements OnInit {
  title = 'Submitted Employees';

  employees: Promise<Employee[]>
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

}