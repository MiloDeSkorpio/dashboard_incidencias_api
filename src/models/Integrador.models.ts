
import { Table, Column,Model,DataType, HasMany} from 'sequelize-typescript'
import Corredor from './Corredor.model';

@Table({
    tableName:'integradores'
})

class Integrador extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string

}

export default Integrador