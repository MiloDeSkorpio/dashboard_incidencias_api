import { Table, Column, Model, DataType, } from 'sequelize-typescript';

@Table({
  tableName: 'fallas',
})
class Falla extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare nombre: string;

}

export default Falla;
