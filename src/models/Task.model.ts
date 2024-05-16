import { Table, Column,Model,DataType,Default} from 'sequelize-typescript'


@Table({
    tableName:'task'
})

class Task extends Model {
    @Column({
        type: DataType.INTEGER  
    })
    declare idBus: number
    @Column({
        type: DataType.INTEGER  
    })
    declare idFalla: number
    @Column({
        type: DataType.TEXT
    })
    declare detalles: string
    @Default(1)
    @Column({
        type: DataType.INTEGER  
    })
    declare idStatus: number
    @Column({
        type: DataType.INTEGER  
    })
    declare idSuper: number
    @Column({
        type: DataType.INTEGER  
    })
    declare idTec: number
   
    @Column({
        type: DataType.DATE,
        
    })
    declare assignedAt: Date
    @Column({
        type: DataType.TEXT
    })
    declare observaciones: string
    @Column({
        type: DataType.DATE
    })
    declare validatedAt: Date
    @Column({
        type: DataType.INTEGER  
    })
    declare timeAtention: number

}

export default Task
