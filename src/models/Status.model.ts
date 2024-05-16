import { Table, Column, Model, DataType, } from 'sequelize-typescript';

@Table({
  tableName: 'status',
})
class Status extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare nombre: string;

}

export default Status;
