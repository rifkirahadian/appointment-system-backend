import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Appointment extends Model {
  @Column
  name: string;

  @Column
  date: Date;

  @Column
  time: string;

  @Column
  status: string;
}
