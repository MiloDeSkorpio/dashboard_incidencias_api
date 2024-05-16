
import { Table, Column,Model,DataType,HasMany} from 'sequelize-typescript'
import Autobus from './Autobus.model'

@Table({
    tableName:'corredores'
})

class Corredor extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string
    @HasMany(() => Autobus, { foreignKey: 'corredorId' })
    autobuses: Autobus[];
}

export default Corredor