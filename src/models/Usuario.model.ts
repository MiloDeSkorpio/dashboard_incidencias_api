import { Table, Column,Model,DataType} from 'sequelize-typescript'


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

}

export default Usuario
