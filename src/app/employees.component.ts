import { Component, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'my-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnChanges {
  title = 'List of Employees';

  employees: Employee[];
  selectedEmployee: Employee;

  positions: string[];

  employeeForm: FormGroup;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) { }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .then(employees => this.employees = employees);
  }

  getPositions(): void {
    this.employeeService
      .getPositions()
      .then(positions => this.positions = positions);
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getPositions();
    this.createForm();
  }

  ngOnChanges() {
    this.employeeForm.reset({
      firstname: '',
      lastname: '',
      position: '',
      birthday: new Date().toISOString().split('T')[0]
    });
  }

  onClick(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  createForm() {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      position: [''],
      birthday: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  onSubmit() {
    this.add(this.employeeForm.value.firstname, this.employeeForm.value.lastname, this.employeeForm.value.position, this.employeeForm.value.birthday);
  }

  add(firstname: string, lastname: string, position: string, birthday: Date): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    if ((!firstname || firstname === '' || firstname.length < 2 || firstname.length > 25) && (!lastname || lastname === '' || lastname.length < 2 || lastname.length > 50) && (!birthday)) { return; }
    this.employeeService.create(firstname, lastname, position, birthday)
      .then(employee => {
        this.employees.push(employee);
        this.selectedEmployee = null;
      });
  }

  revert() { this.ngOnChanges(); }

  save(): void {
    this.selectedEmployee.firstname = this.selectedEmployee.firstname.trim();
    if (!this.selectedEmployee.firstname || this.selectedEmployee.firstname === '' || this.selectedEmployee.firstname.length < 2 || this.selectedEmployee.firstname.length > 25) { return; }
    this.selectedEmployee.lastname = this.selectedEmployee.lastname.trim();
    if (!this.selectedEmployee.lastname || this.selectedEmployee.lastname === '' || this.selectedEmployee.lastname.length < 2 || this.selectedEmployee.lastname.length > 50) { return; }
    if (!this.selectedEmployee.birthday) { return; }
    this.employeeService.update(this.selectedEmployee);
  }

  delete(employee: Employee): void {
    this.employeeService
      .delete(employee.id)
      .then(() => {
        this.employees = this.employees.filter(e => e !== employee);
        if (this.selectedEmployee === employee) { this.selectedEmployee = null; }
      });
  }
}