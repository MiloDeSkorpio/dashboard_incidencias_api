
import { Table, Column,Model,DataType} from 'sequelize-typescript'

@Table({
    tableName:'tipouser'
})

class TipoUser extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string

}

export default TipoUser