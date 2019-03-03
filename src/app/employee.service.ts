import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee';

@Injectable()
export class EmployeeService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });

  public employeesUrl = 'api/employees';
  public employeePositionsUrl = 'http://ibillboard.com/api/positions';

  constructor(public http: Http) { }

  getEmployees(): Promise<Employee[]> {
    return this.http.get(this.employeesUrl)
      .toPromise()
      .then(this.extractEmployees)
      .catch(this.handleError);
  }

  getPositions(): Promise<string[]> {
    return this.http.get(this.employeePositionsUrl)
      .toPromise()
      .then(this.extractPositions)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete(url, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(firstname: string, lastname: string, position: string, birthday: Date): Promise<Employee> {
    let body = JSON.stringify({ firstname: firstname, lastname: lastname, position: position, birthday: birthday });
    return this.http
      .post(this.employeesUrl, body, this.options)
      .toPromise()
      .then(this.createEmployee)
      .catch(this.handleError);
  }

  update(employee: Employee): Promise<Employee> {
    const url = `${this.employeesUrl}/${employee.id}`;
    let body = JSON.stringify(employee);
    return this.http
      .put(url, body, this.options)
      .toPromise()
      .then(() => employee)
      .catch(this.handleError);
  }

  public extractEmployees(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json().data as Employee[];
    return body || {};
  }

  public extractPositions(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json()["positions"] as string[];
    return body || {};
  }

  public createEmployee(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json().data as Employee;
    return body || {};
  }

  public handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}