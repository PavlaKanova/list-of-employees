import { Employee } from './employee';

describe('Employee', () => {
  it('has id', () => {
    const employee = new Employee(1, 'Pavla1', 'Káňová1', '', new Date('1990-08-01'));
    expect(employee.id).toBe(1);
  });

  it('has firstname', () => {
    const employee = new Employee(1, 'Pavla1', 'Káňová1', '', new Date('1990-08-01'));
    expect(employee.firstname).toBe('Pavla1');
  });

  it('has lastname', () => {
    const employee = new Employee(1, 'Pavla1', 'Káňová1', '', new Date('1990-08-01'));
    expect(employee.lastname).toBe('Káňová1');
  });

  it('has position', () => {
    const employee = new Employee(1, 'Pavla1', 'Káňová1', '', new Date('1990-08-01'));
    expect(employee.position).toBe('');
  });

  it('has birthday', () => {
    const employee = new Employee(1, 'Pavla1', 'Káňová1', '', new Date('1990-08-01'));
    const employeeBirthday = employee.birthday.toISOString().split('T')[0];
    expect(employeeBirthday).toBe('1990-08-01');
  });

  it('can clone itself', () => {
    const employee = new Employee(1, 'Pavla1', 'Káňová1', '', new Date('1990-08-01'));
    const clone = employee.clone();
    expect(employee).toEqual(clone);
  });
});