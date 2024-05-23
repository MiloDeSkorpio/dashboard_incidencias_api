import { Table, Column, Model, DataType, } from 'sequelize-typescript';

@Table({
  tableName: 'autobuses',
})
class Autobus extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare economico: string;
  @Column({
    type: DataType.INTEGER
  })
  declare corredorId: number
}

export default Autobus;
