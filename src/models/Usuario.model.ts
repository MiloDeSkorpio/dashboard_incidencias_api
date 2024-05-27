import { Table, Column,Model,DataType,Default} from 'sequelize-typescript'


@Table({
    tableName:'usuarios'
})

class Usuario extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string
    @Column({
        type: DataType.STRING(100)
    })
    declare apellido: string
    @Column({
        type: DataType.CHAR(10)  
    })
    declare telefono: number
    @Column({
        type: DataType.STRING(100)
    })
    declare email: string
    @Column({
        type: DataType.STRING(100)
    })
    declare password: string
    @Column({
        type: DataType.INTEGER  
    })
    declare tipoId: number
    @Column({
        type: DataType.INTEGER  
    })
    declare orgId: number
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare active: boolean

}

export default Usuario
