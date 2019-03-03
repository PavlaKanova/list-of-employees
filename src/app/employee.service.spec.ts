import {
  async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';

export var EMPLOYEES: Employee[] = [
  new Employee(1, 'Pavla1', 'Káňová1', '', new Date('1990-08-01')),
  new Employee(2, 'Pavla2', 'Káňová2', '', new Date('1990-08-02')),
  new Employee(3, 'Pavla3', 'Káňová3', '', new Date('1990-08-03')),
  new Employee(4, 'Pavla4', 'Káňová4', '', new Date('1990-08-04')),
  new Employee(5, 'Pavla5', 'Káňová5', '', new Date('1990-08-05')),
  new Employee(6, 'Pavla6', 'Káňová6', '', new Date('1990-08-06')),
  new Employee(7, 'Pavla7', 'Káňová7', '', new Date('1990-08-07')),
  new Employee(8, 'Pavla8', 'Káňová8', '', new Date('1990-08-08')),
  new Employee(9, 'Pavla9', 'Káňová9', '', new Date('1990-08-09')),
  new Employee(10, 'Pavla10', 'Káňová10', '', new Date('1990-08-10'))
] as Employee[];

describe('EmployeeService (mockBackend)', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        EmployeeService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
      .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([EmployeeService], (service: EmployeeService) => {
      expect(service instanceof EmployeeService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new EmployeeService(http);
    expect(service instanceof EmployeeService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when getEmployees, getPositions, createEmployee', () => {
    let backend: MockBackend;
    let service: EmployeeService;
    let fakeEmployees: Employee[];
    let response: Response;
    let firstname: string;
    let lastname: string;
    let position: string;
    let birthday: Date;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new EmployeeService(http);
      fakeEmployees = EMPLOYEES.map(e => e.clone());
      let options = new ResponseOptions({ status: 200, body: { data: fakeEmployees } });
      response = new Response(options);
      firstname = EMPLOYEES.map(f => f.clone().firstname)[0];
      lastname = EMPLOYEES.map(l => l.clone().lastname)[0];
      position = EMPLOYEES.map(p => p.clone().position)[0];
      birthday = EMPLOYEES.map(f => f.clone().birthday)[0];
    }));

    it('should have expected fake employees', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getEmployees()
        .then(employees => {
          expect(employees.length).toBe(fakeEmployees.length,
            'should have expected no. of employees');
        });
    })));

    it('should be OK returning no employees', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getEmployees()
        .then(employees => {
          expect(employees.length).toBe(0, 'should have no employees');
        })
    })));

    it('should treat 404 as an Promise error with employees', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 404 }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getEmployees()
        .then(employees => {
          fail('should not respond with employees');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
          return Promise.reject(err); // failure is the expected test result
        })
    })));

    it('should treat 404 as an Promise error with positions', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 404 }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getPositions()
        .then(positions => {
          fail('should not respond with positions');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
          return Promise.reject(err); // failure is the expected test result
        })
    })));

    it('should treat 404 as an Promise error with createEmployee', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 404 }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.create(firstname, lastname, position, birthday)
        .then(createEmployee => {
          fail('should not respond with createEmployee');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
          return Promise.reject(err); // failure is the expected test result
        })
    })));
  });
});