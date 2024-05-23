
import { Table, Column,Model,DataType,HasMany} from 'sequelize-typescript'
import Autobus from './Autobus.model'
import { Col } from 'sequelize/lib/utils'

@Table({
    tableName:'corredores'
})

class Corredor extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string
    @Column({
        type: DataType.INTEGER
    })
    declare integradorId: number
}

export default Corredor