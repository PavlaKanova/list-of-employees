export class Employee {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public position: string,
    public birthday: Date) { }
  clone() { return new Employee(this.id, this.firstname, this.lastname, this.position, this.birthday); }
}