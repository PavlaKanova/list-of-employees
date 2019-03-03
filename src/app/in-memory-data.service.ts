import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let employees = [
      { id: 1, firstname: 'Pavla1', lastname: 'Káňová1', position: '', birthday: new Date('1990-08-01').toISOString().split('T')[0] },
      { id: 2, firstname: 'Pavla2', lastname: 'Káňová2', position: '', birthday: new Date('1990-08-02').toISOString().split('T')[0] },
      { id: 3, firstname: 'Pavla3', lastname: 'Káňová3', position: '', birthday: new Date('1990-08-03').toISOString().split('T')[0] },
      { id: 4, firstname: 'Pavla4', lastname: 'Káňová4', position: '', birthday: new Date('1990-08-04').toISOString().split('T')[0] },
      { id: 5, firstname: 'Pavla5', lastname: 'Káňová5', position: '', birthday: new Date('1990-08-05').toISOString().split('T')[0] },
      { id: 6, firstname: 'Pavla6', lastname: 'Káňová6', position: '', birthday: new Date('1990-08-06').toISOString().split('T')[0] },
      { id: 7, firstname: 'Pavla7', lastname: 'Káňová7', position: '', birthday: new Date('1990-08-07').toISOString().split('T')[0] },
      { id: 8, firstname: 'Pavla8', lastname: 'Káňová8', position: '', birthday: new Date('1990-08-08').toISOString().split('T')[0] },
      { id: 9, firstname: 'Pavla9', lastname: 'Káňová9', position: '', birthday: new Date('1990-08-09').toISOString().split('T')[0] },
      { id: 10, firstname: 'Pavla10', lastname: 'Káňová10', position: '', birthday: new Date('1990-08-10').toISOString().split('T')[0] }
    ];
    return { employees };
  }
}