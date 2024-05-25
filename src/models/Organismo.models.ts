import { Table, Column, Model, DataType} from 'sequelize-typescript'

@Table({
    tableName:'organismos'
})

class Organismo extends Model {
    @Column({
        type: DataType.STRING
    })
    declare nombre: string
}

export default Organismo