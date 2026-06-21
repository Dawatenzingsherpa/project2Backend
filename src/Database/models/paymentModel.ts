import {
  Table,
  Column,
  Model,
  DataType,
  
} from 'sequelize-typescript'
import Order from './orderModel'

@Table({
  tableName : "payments",
  modelName : "Payment",
  timestamps : true
})

class Payment extends Model{
  @Column({
    type  : DataType.UUID,
    defaultValue : DataType.UUIDV4,
    primaryKey : true
  })

  declare id : string

  @Column({
    type : DataType.ENUM('cod','Khalti','Esewa'),
    defaultValue : 'cod'
  })
  declare paymentMethod : string

  @Column({
    type : DataType.ENUM('unpaid','paid'),
    defaultValue : 'unpaid'
  })
  declare paymentStatus: string

  @Column({
    type : DataType.STRING,
    
  })
  declare pidx: string 
}


export default Payment